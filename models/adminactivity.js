"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminActivity.init(
    {
      user_id: DataTypes.STRING,
      activity: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      error_message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdminActivity",
    }
  );
  return AdminActivity;
};
