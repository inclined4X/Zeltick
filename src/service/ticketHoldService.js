const { default: mongoose } = require("mongoose");
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
      unitPrice: ticketType.price,
      quantity: item.quantity,
    });
  }

  const session = await mongoose.startSession();

  try {
    let createdHold;

    await session.withTransaction(async () => {
      for (const validatedItem of validatedItems) {
        const reservedTicketType =
          await ticketHoldRepository.reserveTicketTypeInventory(
            validatedItem.ticketTypeId,
            validatedItem.quantity,
            session,
          );

        if (!reservedTicketType) {
          throw new AppError(
            "Insufficient inventory or ticket type is no longer active",
            409,
          );
        }
      }

      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

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
  } finally {
    await session.endSession();
  }
};

module.exports = { createTicketHold };
