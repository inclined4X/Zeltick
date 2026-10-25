const mongoose = require("mongoose");
const ticketHoldRepository = require("../repositories/ticketHoldRepository");

const ticketHoldExpiration = async () => {
  const now = new Date();

  const expiredActiveHolds =
    await ticketHoldRepository.findExpiredActiveHolds(now);

  if (expiredActiveHolds.length === 0) {
    return;
  }

  for (const hold of expiredActiveHolds) {
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        const statusResult = await ticketHoldRepository.updateHoldStatus(
          hold._id,
          "active",
          "expired",
          session,
        );

        if (statusResult.modifiedCount !== 1) {
          return;
        }

        for (const item of hold.items) {
          const releaseResult =
            await ticketHoldRepository.releaseTicketTypeInventory(
              item.ticketTypeId,
              hold.eventId,
              item.quantity,
              session,
            );

          if (releaseResult.modifiedCount !== 1) {
            throw new Error(
              `Failed to release inventory for ticket type ${item.ticketTypeId} in hold ${hold._id}`,
            );
          }
        }
      });
    } catch (error) {
      console.error(`Failed to expire ticket hold ${hold._id}:`, error);
    } finally {
      await session.endSession();
    }
  }
};

module.exports = ticketHoldExpiration;
