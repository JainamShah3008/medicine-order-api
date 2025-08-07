const router = require("express").Router();

const medicineRoute = require("./medicine");

router.use("/medicine", medicineRoute);

module.exports = router;
