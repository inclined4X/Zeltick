const crypto = require("crypto");
const organizerRepository = require("../repositories/organizerRepository");
const verifyEmail = async (tokenFromUrl) => {
  const tokenFromUrlHashed = crypto
    .createHash(sha256)
    .update(tokenFromUrl)
    .digest("hex");

  const organizer = await organizerRepository;
};
