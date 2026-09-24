const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserById = async (userId) => {
  return await User.findById(userId).select(
    "-passwordHash -verificationTokenHash -verificationTokenExpiresAt",
  );
};

const findUserByVerificationTokenHash = async (verificationTokenHash) => {
  return await User.findOne({ verificationTokenHash });
};

const updateUserWithRole = async (userId, role, session) => {
  return await User.updateOne(
    { _id: userId },
    { $addToSet: { roles: role } },
    { session },
  );
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  findUserByVerificationTokenHash,
};
