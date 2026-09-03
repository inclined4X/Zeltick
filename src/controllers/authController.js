const signupService = require("../service/signupService");
const loginService = require("../service/loginService");

const signup = async (req, res, next) => {
  try {
    const user = await signupService.signup(req.body);

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await loginService.login(req.body);

    return res.status(200).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
