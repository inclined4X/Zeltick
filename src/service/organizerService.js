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

const OrganizerMe = async (userId) => {
  const organizer = await organizerRepository.findOrganizerByUserId(userId);

  if (!organizer) {
    throw new AppError("Organizer does not exist");
  }

  return organizer;
};

module.exports = {
  becomeOrganizerService,
};
