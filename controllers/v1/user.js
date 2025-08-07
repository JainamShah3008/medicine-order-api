const db = require("../../models");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userModel = db.user;

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const findExstingEmail = await userModel.findOne({ where: { email } });

    if (findExstingEmail) {
      return res.status(200).send({ status: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user_data = {
      name,
      email,
      password: hashedPassword,
      role: "user",
    };

    const createUser = await userModel
      .create(user_data)
      .then(async (res) => {
        return {
          status: true,
          message: "User created successfully",
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: error?.message || "User created failed",
        };
      });

    return res.status(200).send(createUser);
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error?.message || "User created failed",
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne(
      { where: { email } },
      { raw: true }
    );

    if (!findUser) {
      return res.status(200).send({ status: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, findUser.password);

    if (!isPasswordMatch) {
      return res.status(200).send({ status: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).send({ status: true, message: "User logged in successfully", token });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error?.message || "User logged in failed",
    });
  }
};
