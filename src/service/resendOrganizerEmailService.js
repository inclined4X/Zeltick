const AppError = require("../errors/appError");
const tokenGenerate = require("../utils/token");
const crypto = require("crypto");
const sendVerificationEmail = require("./emailService");
const organizerRepository = require("../repositories/organizerRepository");

const resendOrganizerVerificationEmail = async (userId) => {
  const organizer = await organizerRepository.findOrganizerByUserId(userId);

  if (!organizer) {
    throw new AppError("Organizer does not exist");
  }

  if (!organizer.pendingEmail) {
    throw new AppError("Pending email does not exist", 400);
  }

  const tokenForEmail = tokenGenerate();

  const tokenHash = crypto
    .createHash("sha256")
    .update(tokenForEmail)
    .digest("hex");

  const newVerificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  organizer.emailChangeTokenHash = tokenHash;

  organizer.emailChangeTokenExpiresAt = newVerificationTokenExpiresAt;

  await organizer.save();

  await sendVerificationEmail(organizer.pendingEmail, tokenForEmail);
};

module.exports = { resendOrganizerVerificationEmail };
