const signupService = require("../service/signupService");
const loginService = require("../service/loginService");

const signup = async (req, res, next) => {
  try {
    const user = await signupService.signup(req.body);

    req.session.regenerate(function (err) {
      if (err) return next(err);
      req.session.userId = user.id;
      res.status(201).json({ status: "success", data: user });
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await loginService.login(req.body);

    req.session.regenerate(function (err) {
      if (err) return next(err);
      req.session.userId = user.id;

      return res.status(200).json({ status: "success", data: user });
    });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, me };
