const argon2 = require("argon2");
const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");

const login = async (credentials) => {
  const { email, password } = credentials;

  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid credentials!", 401);
  }

  const passwordMatch = await argon2.verify(user.passwordHash, password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roles: user.roles,
  };
};

module.exports = {
  login,
};
