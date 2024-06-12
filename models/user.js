const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_token_access: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_token_refresh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_account_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
