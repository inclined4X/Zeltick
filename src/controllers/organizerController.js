const organizerService = require("../service/organizerService");
const verifyOrganizerEmailService = require("../service/verifyOrganizerEmailService");
const resendOrganizerEmailService = require("../service/resendOrganizerEmailService");

const becomeOrganizerController = async (req, res, next) => {
  try {
    const organizerData = req.body;
    const userId = req.user._id;

    const organizer = await organizerService.becomeOrganizerService(
      userId,
      organizerData,
    );

    res.status(201).json({
      status: "success",
      data: organizer,
    });
  } catch (err) {
    next(err);
  }
};

const getMyOrganizerProfileController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const organizer =
      await organizerService.getMyOrganizerProfileService(userId);

    return res.status(200).json({
      status: "success",
      data: organizer,
    });
  } catch (err) {
    next(err);
  }
};

const updateOrganizerController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;

    const updatedOrganizer = await organizerService.updateOrganizerService(
      userId,
      updateData,
    );

    return res.status(200).json({
      status: "success",
      data: updatedOrganizer,
    });
  } catch (err) {
    next(err);
  }
};

const verifyOrganizerEmailController = async (req, res, next) => {
  try {
    const token = req.query.token;

    if (!token) {
      return next(new AppError("Invalid or expired verification token", 400));
    }

    await verifyOrganizerEmailService.verifyOrganizerEmail(token);

    return res.status(200).json({
      status: "success",
      message: "organizer email verified successfully",
    });
  } catch (err) {
    next(err);
  }
};

const resendOrganizerVerificationEmailController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await resendOrganizerEmailService.resendOrganizerVerificationEmail(userId);

    return res.status(200).json({
      status: "success",
      message: "Verification has been resent",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  becomeOrganizerController,
  getMyOrganizerProfileController,
  updateOrganizerController,
  verifyOrganizerEmailController,
  resendOrganizerVerificationEmailController,
};
