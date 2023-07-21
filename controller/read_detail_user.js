const global_response = require("../global_response");
const { User } = require("../models/index");
const { Sequelize } = require('sequelize');

async function read_detail_user(req, res) {
  try {
    const { id } = req.params;

    const result_find = await User.findByPk(id, {
      attributes: [
        "id",
        "user_id",
        "running",
        [
          Sequelize.literal(
            'CASE WHEN detail IS NULL THEN "-" ELSE detail END'
          ),
          "detail",
        ],
        [
          Sequelize.literal('DATE_FORMAT(createdAt, "%Y-%m-%d %H:%i:%s")'),
          "createdAt",
        ],
        [
          Sequelize.literal('DATE_FORMAT(createdAt, "%Y-%m-%d %H:%i:%s")'),
          "updatedAt",
        ],
      ],
    });

    res.status(200).json(global_response("Success", 200, result_find));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error));
  }
}

module.exports = read_detail_user;
