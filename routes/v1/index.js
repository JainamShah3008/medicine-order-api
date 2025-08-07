const router = require("express").Router();

const userRoute = require("./user");
const orderRoute = require("./order");

router.use("/user", userRoute);
router.use("/order", orderRoute);

module.exports = router;
