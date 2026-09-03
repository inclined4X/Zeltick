const signupService = require("../service/signupService");

const signup = async (req, res, next) => {
  try {
    const user = await signupService.signup(req.body);

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = signup;
