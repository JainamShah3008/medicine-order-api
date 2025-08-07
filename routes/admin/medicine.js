const router = require("express").Router();

const userAuth = require("../../middlewares/auth");

const medicineController = require("../../controllers/admin/medicine");

const {access_roles} = require("../../middlewares/check_role");

router.post("/create-medicine", userAuth, access_roles("admin"), medicineController.createMedicine);
router.post("/update-medicine/:medicineId", userAuth, access_roles("admin"), medicineController.updateMedicine);
router.delete("/delete-medicine/:medicineId", userAuth, access_roles("admin"), medicineController.deleteMedicine);

module.exports = router;