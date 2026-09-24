const AppError = require("../errors/appError");
const userRepository = require("../repositories/userRepository");
const organizerRepository = require("../repositories/organizerRepository");
const { default: mongoose } = require("mongoose");

const session = await mongoose.startSession();

const becomeOrganizer = async (userId, organizerData) => {
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

  try {
    await organizerRepository.createOrganizer(organizerData, session);

    await userRepository.updateUserWithRole(userId, "organizer", session);
  } finally {
    await session.endSession();
  }

  user.roles.push("organizer");

  await user.save();

  return organizer;
};
