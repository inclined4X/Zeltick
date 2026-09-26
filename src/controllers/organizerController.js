const organizerService = require("../service/organizerService");

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

module.exports = {
  becomeOrganizerController,
  getMyOrganizerProfileController,
};
