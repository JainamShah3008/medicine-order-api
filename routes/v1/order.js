const router = require("express").Router();

const userAuth = require("../../middlewares/auth");

const orderController = require("../../controllers/v1/order");

router.post("/place-order", userAuth, orderController.placeOrder);

router.get(
  "/order-details/:orderId",
  userAuth,
  orderController.getOrderById
);
module.exports = router;
