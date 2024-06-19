const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Restaurant = sequelize.define(
  "Restaurant",
  {
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurant_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurant_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    restaurant_telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "restaurants",
    timestamps: false,
  }
);

module.exports = Restaurant;
