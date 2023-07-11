const global_response = require("../global_response");
const { User } = require("../models/index");

async function read_all_user(req, res) {
  try {
    let options = {
      attributes: ["id", "user_id"],
    };

    let { user_running } = req.query;

    if (user_running !== undefined) {
      options.where = { running: user_running === "true" };
    }

    const result_find = await User.findAll(options);

    res.status(200).json(global_response("Success", 200, result_find));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error));
  }
}

module.exports = read_all_user;
