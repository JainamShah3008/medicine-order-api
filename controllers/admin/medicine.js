const { Op } = require("sequelize");
const db = require("../../models");
const _ = require("lodash");
require("dotenv").config();

const medicineModel = db.medicine;

module.exports.createMedicine = async (req, res) => {
  try {
    const { name, brand, price, stock_quantity } = req.body;

    const findExstingMedicine = await medicineModel.findOne({
      where: { name, brand },
    });

    if (findExstingMedicine) {
      return res
        .status(200)
        .send({ status: false, message: "Medicine name already exists" });
    }

    const data = {
      name,
      brand,
      price,
      stock_quantity,
    };

    const createMedicine = await medicineModel
      .create(data)
      .then(async (res) => {
        return {
          status: true,
          message: "Medicine created successfully",
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: error?.message || "Medicine created failed",
        };
      });

    return res.status(200).send(createMedicine);
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error?.message || "Medicine created failed",
    });
  }
};

module.exports.updateMedicine = async (req, res) => {
  try {
    const { name, brand, price, stock_quantity } = req.body;
    const { medicineId } = req?.params;

    const findMedicine = await medicineModel.findOne({
      where: { id: medicineId },
    });

    if (!findMedicine) {
      return res
        .status(200)
        .send({ status: false, message: "Medicine not found" });
    }

    const data = {
      name,
      brand,
      price,
      stock_quantity,
    };

    const updateMedicine = await medicineModel
      .update(data, { where: { id: medicineId } })
      .then(async (res) => {
        return {
          status: true,
          message: "Medicine updated successfully",
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: error?.message || "Medicine updated failed",
        };
      });

    return res.status(200).send(updateMedicine);
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error?.message || "Medicine updated failed",
    });
  }
};

module.exports.deleteMedicine = async (req, res) => {
  try {
    const { medicineId } = req?.params;

    const findMedicine = await medicineModel.findOne({
      where: { id: medicineId },
    });

    if (!findMedicine) {
      return res
        .status(200)
        .send({ status: false, message: "Medicine not found" });
    }

    const deleteMedicine = await medicineModel
      .destroy({
        where: { id: medicineId },
      })
      .then(async (res) => {
        return {
          status: true,
          message: "Medicine deleted successfully",
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: error?.message || "Medicine deleted failed",
        };
      });

    return res.status(200).send(deleteMedicine);
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error?.message || "Medicine deleted failed",
    });
  }
};
