"use strict";

const { Model } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      this.hasMany(models.order_item, { foreignKey: "order_id", as: "item" });
    }
  }

  order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "order",
      tablename: "order",
    }
  );

  return order;
};
