const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  findUserByEmail,
  createUser,
};
