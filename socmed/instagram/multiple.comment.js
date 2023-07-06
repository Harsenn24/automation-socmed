const global_response = require("../../global_response");
const { validate_body_comment_multiple } = require("../../helper/validation");
const processJobs = require("../../helper/worker");

async function comment_ig_multiple(req, res) {
  try {
    const check_validate = await validate_body_comment_multiple(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_data, post_link } = req.body;

    const final_result = await processJobs(
      user_data,
      post_link,
      "ig",
      "comment"
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error));
  }
}

module.exports = comment_ig_multiple;
