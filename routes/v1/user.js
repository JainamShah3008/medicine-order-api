const router = require("express").Router();

const {
  signUpValidator,
  loginValidator,
  validation,
} = require("../../middlewares/validations/v1/common");

const userController = require("../../controllers/v1/user");

router.post(
  "/create-user",
  signUpValidator,
  validation,
  userController.createUser
);
router.post(
  "/login-user",
  loginValidator,
  validation,
  userController.loginUser
);

module.exports = router;
