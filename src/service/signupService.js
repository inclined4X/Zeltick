const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");
const argon2 = require("argon2");
const crypto = require("crypto");
const tokenGenerate = require("../utils/token");
const sendVerificationEmail = require("./emailService");

const signup = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
  });

  const tokenForEmail = tokenGenerate();

  const verificationTokenHash = crypto
    .createHash("sha256")
    .update(tokenForEmail)
    .digest("hex");

  const verificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const newUser = await userRepository.createUser({
    firstName,
    lastName,
    passwordHash,
    email,
    roles: ["attendee"],
    verificationTokenHash,
    verificationTokenExpiresAt,
  });

  await sendVerificationEmail(email, tokenForEmail);

  return {
    id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    roles: newUser.roles,
  };
};

module.exports = {
  signup,
};
