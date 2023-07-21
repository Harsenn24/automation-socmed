const global_response = require("../../global_response");
const { validate_body_follow } = require("../../helper/validation");
const test_worker = require("../../helper/worker/worker");
const helper_follow_fb = require("../../services/facebook/follow.fb");

async function follow_fb_multiple(req, res) {
  try {
    const check_validate = await validate_body_follow(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, profile_link } = req.body;

    const { headless } = req.query;

    res.status(200).json(global_response("SUCCESS", 200, "processing data"));

    await test_worker(
      user_id,
      profile_link,
      helper_follow_fb,
      headless,
      "Follow Facebook",
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = follow_fb_multiple;
