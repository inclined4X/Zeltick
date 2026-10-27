const ticketHoldExpiration = require("../services/ticketHoldExpirationService");

const INTERVAL_MS = 60 * 1000;

let intervalId;
let isRunning = false;

const runExpirationJob = async () => {
  if (isRunning) {
    return;
  }

  isRunning = true;

  try {
    await ticketHoldExpiration();
  } catch (error) {
    console.error("Ticket hold expiration job failed:", error);
  } finally {
    isRunning = false;
  }
};

const startTicketHoldExpirationJob = () => {
  if (intervalId) {
    return;
  }

  void runExpirationJob();

  intervalId = setInterval(() => {
    void runExpirationJob();
  }, INTERVAL_MS);
};

const stopTicketHoldExpirationJob = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
};

module.exports = {
  startTicketHoldExpirationJob,
  stopTicketHoldExpirationJob,
};
