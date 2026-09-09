const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserById = async (userId) => {
  return await User.findById(userId).select("-passwordHash");
};

const findUserByVerificationTokenHash = async (verificationTokenHash) => {
  return await User.findOne({ verificationTokenHash });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  findUserByVerificationTokenHash,
};
