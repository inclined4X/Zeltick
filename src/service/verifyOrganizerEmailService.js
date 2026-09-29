const crypto = require("crypto");
const organizerRepository = require("../repositories/organizerRepository");
const AppError = require("../errors/appError");
const verifyEmail = async (tokenFromUrl) => {
  const tokenFromUrlHashed = crypto
    .createHash("sha256")
    .update(tokenFromUrl)
    .digest("hex");

  const organizer =
    await organizerRepository.findOrganizerByHashedToken(tokenFromUrlHashed);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  const currentTime = new Date();

  if (organizer.emailChangeTokenExpiresAt <= currentTime) {
    throw new AppError("Token has expired or token is invalid", 400);
  }

  organizer.email = organizer.pendingEmail;

  organizer.pendingEmail = undefined;

  organizer.emailChangeTokenExpiresAt = undefined;

  organizer.emailChangeTokenHash = undefined;

  await organizer.save();

  return organizer;
};
