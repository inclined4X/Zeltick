const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const AppError = require("../errors/appError");

const verifyEmail = async (tokenFromUrl) => {
  const tokenFromUrlHashed = crypto
    .createHash("sha256")
    .update(tokenFromUrl)
    .digest("hex");

  const userWithToken =
    await userRepository.findUserByVerificationTokenHash(tokenFromUrlHashed);
  if (!userWithToken) {
    throw new AppError("Invalid or expired verification token", 401);
  }
};
