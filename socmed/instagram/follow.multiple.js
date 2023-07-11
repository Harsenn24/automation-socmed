const global_response = require("../../global_response");
const helper_follow_ig = require("../../helper/follow.ig");
const test_worker = require("../../helper/testworker.js");
const { validate_body_follow } = require("../../helper/validation");

async function follow_ig_multiple(req, res) {
  try {
    const check_validate = await validate_body_follow(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, profile_link } = req.body;

    const final_result = await test_worker(
      user_id,
      profile_link,
      helper_follow_ig,
      "follow"
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error));
  }
}

module.exports = follow_ig_multiple;
