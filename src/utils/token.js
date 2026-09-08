const crypto = require("crypto");

const tokenGenerate = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = tokenGenerate;
