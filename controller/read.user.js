const global_response = require("../global_response");
const { User } = require("../models/index");

async function read_all_user(req, res) {
  try {
    const result_find = await User.findAll({
      attributes: ["id", "user_id"],
    });
    
    res.status(200).json(global_response("Success", 200, result_find));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error));
  }
}

module.exports = read_all_user;
