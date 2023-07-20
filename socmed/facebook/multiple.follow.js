const global_response = require("../../global_response");
const test_worker = require("../../helper/worker/worker.js");
const { validate_body_follow } = require("../../helper/validation");
const helper_follow_fb = require("../../helper/facebook/follow.fb");

async function follow_fb_multiple(req, res) {
  try {
    const check_validate = await validate_body_follow(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, profile_link } = req.body;

    const { headless } = req.query;

    const final_result = await test_worker(
      user_id,
      profile_link,
      helper_follow_fb,
      "follow",
      headless
    );

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.toString()));
  }
}

module.exports = follow_fb_multiple;
