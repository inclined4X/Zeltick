const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const AppError = require("../errors/appError");

const verifyEmail = async (tokenFromUrl) => {
  const tokenFromUrlHashed = crypto
    .createHash("sha256")
    .update(tokenFromUrl)
    .digest("hex");

  const user =
    await userRepository.findUserByVerificationTokenHash(tokenFromUrlHashed);
  if (!user) {
    throw new AppError("Invalid or expired verification token", 400);
  }

  const userDateVerification = user.verificationTokenExpiresAt;
  const currentDate = new Date();

  if (currentDate > userDateVerification) {
    throw new AppError("Invalid or expired verification token", 400);
  }

  if (!user.verificationTokenHash) {
    throw new AppError("Invalid or expired verification token", 400);
  }

  user.emailVerified = true;
  user.verificationTokenHash = undefined;
  user.verificationTokenExpiresAt = undefined;

  await user.save();
};
