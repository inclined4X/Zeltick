const encodedCursor = ({ startDateTime, id }) => {
  const payload = JSON.stringify({
    startDateTime,
    id,
  });

  return Buffer.from(payload).toString("base64url");
};

const decodedCursor = (cursor) => {
  try {
    const decode = Buffer.from(cursor, "base64url").toString("utf8");

    const parsed = JSON.parse(decode);

    if (!parsed.startDateTime || !parsed.id) {
      throw new Error("Invalid cursor");
    }

    return parsed;
  } catch (err) {
    throw new Error("Invalid cursor");
  }
};

module.exports = {
  encodedCursor,
  decodedCursor,
};
