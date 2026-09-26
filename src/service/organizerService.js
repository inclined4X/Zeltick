const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");
const organizerRepository = require("../repositories/organizerRepository");
const { default: mongoose } = require("mongoose");

const becomeOrganizerService = async (userId, organizerData) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  if (!user.emailVerified) {
    throw new AppError("User email is not verified", 404);
  }

  const existingOrganizer =
    await organizerRepository.findOrganizerByUserId(userId);

  if (existingOrganizer) {
    throw new AppError("Organizer already exists", 409);
  }

  const organizerDetails = {
    ...organizerData,
    userId,
    email: user.email,
  };

  const session = await mongoose.startSession();

  try {
    const organizer = await session.withTransaction(async () => {
      const [createdOrganizer] = await organizerRepository.createOrganizer(
        organizerDetails,
        session,
      );

      await userRepository.updateUserWithRole(userId, "organizer", session);

      return createdOrganizer;
    });

    return organizer;
  } finally {
    await session.endSession();
  }
};

const getMyOrganizerProfileService = async (userId) => {
  const organizer = await organizerRepository.findOrganizerByUserId(userId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  return organizer;
};

const EDITABLE_ORGANIZER_FIELDS = [
  "name",
  "description",
  "contactPhone",
  "logo",
  "website",
];

const updateOrganizerService = async (userId, updateData) => {
  const organizer = await organizerRepository.findOrganizerByUserId(userId);

  if (!organizer) {
    throw new AppError("Organizer does not exist", 404);
  }

  const requestedFields = Object.keys(updateData);

  if (requestedFields.length === 0) {
    throw new AppError("No fields provided for this update", 400);
  }

  const invalidFields = requestedFields.filter(
    (field) =>
      !EDITABLE_ORGANIZER_FIELDS.includes(field) && field !== "socialLinks",
  );

  if (invalidFields.length > 0) {
    throw new AppError(
      `The following fields can't be updated: ${invalidFields.join(", ")}`,
      400,
    );
  }

  const allowedUpdates = {};

  for (const field of EDITABLE_ORGANIZER_FIELDS) {
    if (Object.hasOwn(updateData, field)) {
      allowedUpdates[field] = updateData[field];
    }
  }

  if (Object.hasOwn(updateData, "socialLinks")) {
    allowedUpdates.socialLinks = {
      ...organizer.socialLinks,
      ...updateData.socialLinks,
    };
  }

  Object.assign(organizer, allowedUpdates);

  await organizer.save();

  return organizer;
};

module.exports = {
  becomeOrganizerService,
  getMyOrganizerProfileService,
  updateOrganizerService,
};
