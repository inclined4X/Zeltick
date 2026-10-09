const TicketType = require("./src/models/ticketTypeModel");

async function runValidationTests() {
  const validTicket = new TicketType({
    eventId: "507f1f77bcf86cd799439011",
    name: "Early Bird",
    price: 5000,
    quantityTotal: 100,
  });

  try {
    await validTicket.validate();
    console.log("PASS: valid ticket type");
  } catch (error) {
    console.error("FAIL:", error.message);
  }

  const invalidTicket = new TicketType({
    eventId: "507f1f77bcf86cd799439011",
    name: "A",
    price: -100,
    quantityTotal: 0,
  });

  try {
    await invalidTicket.validate();
    console.error("FAIL: invalid ticket passed validation");
  } catch (error) {
    console.log("PASS: invalid ticket was rejected");
    console.log(
      Object.entries(error.errors).map(([field, issue]) => ({
        field,
        message: issue.message,
      })),
    );
  }
}

runValidationTests();
