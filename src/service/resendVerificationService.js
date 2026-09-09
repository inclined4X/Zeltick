const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");
const tokenGenerate = require("../utils/token");
const crypto = require("crypto");
const sendVerificationEmail = require("./emailService");

const resendVerficationEmail = async (user) => {
  if (user.emailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  const tokenForEmail = tokenGenerate();

  const tokenHash = crypto
    .createHash("sha256")
    .update(tokenForEmail)
    .digest("hex");

  const newVerificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  user.verificationTokenHash = tokenHash;

  user.verificationTokenExpiresAt = newVerificationTokenExpiresAt;

  await user.save();

  await sendVerificationEmail(user.email, tokenForEmail);
};

module.exports = resendVerficationEmail;
