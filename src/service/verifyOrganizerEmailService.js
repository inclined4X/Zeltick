const crypto = require("crypto");
const verifyEmail = async (tokenFromUrl) => {
  const tokenFromUrlHashed = crypto
    .createHash(sha256)
    .update(tokenFromUrl)
    .digest("hex");
};
