const _ = require("lodash");
require("dotenv").config();

const access_roles = (allowedRoles) => {
  const apiName = new Error().stack
    .split("\n")[1]
    .trim()
    .match(/^at (.*?)\s/)[1];
  return async function (req, res, next) {
    try {
      user = req.user;
      if (user && allowedRoles.includes(user.role)) {
        next();
      } else {
        return res.json({
          status: false,
          message: "You don't have permission to access.",
          code: 402,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: error.message, code: 500 });
    }
  };
};

module.exports = {
  access_roles,
};
