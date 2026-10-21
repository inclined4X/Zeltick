const mongoose = require("mongoose");
const AppError = require("../errors/appError");
const eventRepository = require("../repositories/eventRepository");
const ticketTypeRepository = require("../repositories/ticketTypeRepository");
const ticketHoldRepository = require("../repositories/ticketHoldRepository");

const createTicketHold = async (userId, eventId, items) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError("User ID is invalid", 400);
  }

  if (!mongoose.isValidObjectId(eventId)) {
    throw new AppError("Event ID is invalid", 400);
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError("Items must be a non-empty array", 400);
  }

  const ticketTypeIds = items.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new AppError("Each item must be an object", 400);
    }

    if (!mongoose.isValidObjectId(item.ticketTypeId)) {
      throw new AppError("Ticket type ID is invalid", 400);
    }

    if (
      !Number.isSafeInteger(item.quantity) ||
      item.quantity <= 0 ||
      item.quantity > 10
    ) {
      throw new AppError(
        "Quantity must be a positive safe integer no greater than 10",
        400,
      );
    }

    return item.ticketTypeId.toString();
  });

  if (new Set(ticketTypeIds).size !== ticketTypeIds.length) {
    throw new AppError("Duplicate ticket type IDs are not allowed", 400);
  }

  const event = await eventRepository.findPublicEventById(eventId);

  if (!event) {
    throw new AppError("Event does not exist", 404);
  }

  if (event.status !== "PUBLISHED") {
    throw new AppError("Event is not published", 400);
  }

  const validatedItems = [];

  for (const item of items) {
    const ticketType = await ticketTypeRepository.findTicketTypeByIdAndEvent(
      item.ticketTypeId,
      eventId,
    );

    if (!ticketType) {
      throw new AppError("Ticket type does not exist", 404);
    }

    if (ticketType.status !== "active") {
      throw new AppError("Ticket type is not active", 400);
    }

    validatedItems.push({
      ticketTypeId: ticketType._id,
      quantity: item.quantity,
      unitPrice: ticketType.price,
    });
  }

  const session = await mongoose.startSession();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

  let createdHold;

  try {
    await session.withTransaction(async () => {
      const existingHold =
        await ticketHoldRepository.findActiveHoldByUserAndEvent(
          userId,
          eventId,
          session,
        );

      if (existingHold) {
        if (existingHold.expiresAt > now) {
          throw new AppError(
            "You already have an active hold for this event",
            409,
          );
        }

        const statusResult = await ticketHoldRepository.updateHoldStatus(
          existingHold._id,
          "active",
          "expired",
          session,
        );

        if (statusResult.modifiedCount !== 1) {
          throw new AppError(
            "The existing hold could not be expired safely",
            409,
          );
        }

        for (const item of existingHold.items) {
          const releaseResult =
            await ticketHoldRepository.releaseTicketTypeInventory(
              item.ticketTypeId,
              existingHold.eventId,
              item.quantity,
              session,
            );

          if (releaseResult.modifiedCount !== 1) {
            throw new AppError(
              "Could not release the expired hold's inventory",
              409,
            );
          }
        }
      }

      for (const item of validatedItems) {
        const reservedTicketType =
          await ticketHoldRepository.reserveTicketTypeInventory(
            item.ticketTypeId,
            eventId,
            item.quantity,
            session,
          );

        if (!reservedTicketType) {
          throw new AppError(
            "Insufficient inventory or ticket type is no longer available",
            409,
          );
        }
      }

      createdHold = await ticketHoldRepository.createTicketHold(
        {
          userId,
          eventId,
          items: validatedItems,
          status: "active",
          expiresAt,
        },
        session,
      );
    });

    return createdHold;
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("You already have an active hold for this event", 409);
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

module.exports = { createTicketHold };
