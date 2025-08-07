const db = require("../../models");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const medicineModel = db.medicine;

module.exports.placeOrder = async (req, res) => {
  try {
    const { user_id } = req?.user;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(200).send({
        status: false,
        message: "Order items are required!",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    const medicines = await medicineModel.findAll({
      where: { medicine_id: items.map((item) => item.medicine_id) },
    });

    const medicineMap = new Map(medicines.map((med) => [med.medicine_id, med]));

    for (const item of items) {
      const medicine = medicineMap.get(item.medicine_id);
      if (!medicine) {
        return res.status(200).send({
          status: false,
          message: `Medicine with ID ${item.medicine_id} not found!`,
        });
      }

      if (medicine.stock_quantity < item.quantity) {
        return res.status(200).send({
          status: false,
          message: `insufficient quantity for${medicine.name}, available quantity is ${medicine.stock_quantity}!`,
        });
      }

      const itemTotal = medicine.price * item.quantity;
      totalAmount += itemTotal;
      orderItems.push({
        medicine_id: medicine.medicine_id,
        quantity: item.quantity,
        total: itemTotal,
        price: medicine.price,
      });
    }

    const order = await orderModel.create({
      user_id,
      total_amount: totalAmount,
    });

    const orderItemsWithOdrerIds = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    await orderItemModel.bulkcreate(orderItemsWithOdrerIds);

    //Update the stock quantity
    for (const item of items) {
      const medicine = medicineMap.get(item.medicine_id);
      if (medicine) {
        await medicineModel.decrement(
          "stock_quantity",
          { by: item.quantity },
          { where: { medicine_id: item.medicine_id } }
        );
      }
    }

    const orderDetails = await odrerModel.findByPk(order.order_id, {
      include: [
        {
          model: orderItemModel,
          as: "item",
          include: [
            {
              model: medicineModel,
              as: "medicine",
              attributes: [
                "medicine_id",
                "name",
                "brand",
                "price",
                "stock_quantity",
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).send({
      status: true,
      orderDetails,
      message: "Order placed successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const { user_id } = req?.user;
    const { orderId } = req?.params;

    const orderHistory = await odrerModel.findOne({
      where: { order_id: orderId, user_id },
      include: [
        {
          model: orderItemModel,
          as: "item",
          include: [
            {
              model: medicineModel,
              as: "medicine",
              attributes: [
                "medicine_id",
                "name",
                "brand",
                "price",
                "stock_quantity",
              ],
            },
          ],
        },
      ],
    });
    if (!orderHistory) {
      return res.status(200).send({
        status: false,
        message: "Order not found!",
      });
    }

    return res.status(200).send({
      status: true,
      orderHistory,
      message: "Order history fetched successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};
