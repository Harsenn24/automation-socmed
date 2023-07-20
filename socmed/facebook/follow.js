const global_response = require("../../global_response");
const { validate_body_follow } = require("../../helper/validation");
const update_user_account = require("../../controller/update.user");
const helper_follow_fb = require("../../helper/facebook/follow.fb");

async function follow_fb(req, res) {
  try {
    const check_validate = await validate_body_follow(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, profile_link } = req.body;

    const { headless } = req.query;

    const final_result = await helper_follow_fb(
      user_id,
      profile_link,
      headless
    );

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    const { user_id } = req.body;

    await update_user_account(user_id, error.message, false);

    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = follow_fb;
