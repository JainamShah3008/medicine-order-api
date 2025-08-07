const router = require("express").Router();

const userController = require("../../controllers/v1/user");

router.post("/create-user", userController.createUser);
router.post("/login-user", userController.loginUser);

module.exports = router;