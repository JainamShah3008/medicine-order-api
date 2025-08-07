const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();

const db = require("../models");

const userModel = db.user;

module.exports = async (req, res, next) => {
  try {
    const Authorization =
      req.headers["authorization"]?.split("Bearer ")[1] || null;

    if (Authorization !== null) {
      await jwt.verify(
        Authorization,
        process.env.APP_SECRET,
        async function (err, decoded) {
          if (err !== null) {
            return res.status(402).send({
              status: false,
              message: err.message,
              code: 402,
              module: "user",
            });
          }
          if (decoded) {
            req.user = decoded;

            if (!decoded?.user_id) {
              return res.status(401).json({
                status: false,
                message: "Invalid token: Missing user identification",
              });
            }

            const findUser = await userModel.findOne({
              where: { user_id: decoded.user_id },
              raw: true,
            });

            if (!findUser) {
              return res.status(402).send({
                status: false,
                message: "User not exist.",
              });
            }

            // Attach the complete user object including role to the request
            req.user = {
              ...findUser,
              role: findUser.role || "user", // Default to 'user' role if not specified
            };

            next();
          } else {
            return res.status(402).send({
              status: false,
              message: "You are not authorized.",
            });
          }
        }
      );
    } else {
      return res.status(402).send({
        status: false,
        message: "Token not found.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: error.message, code: 500 });
  }
};
