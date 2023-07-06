const global_response = require("../../global_response");
const { validate_body_like } = require("../../helper/validation");
const processJobs = require("../../helper/worker");

async function like_ig_multiple(req, res) {
  try {
    const check_validate = await validate_body_like(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link } = req.body;

    const result = await processJobs(user_id, post_link, "ig");

    res.status(200).json(global_response("Success", 200, result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error));
  }
}

module.exports = like_ig_multiple;
