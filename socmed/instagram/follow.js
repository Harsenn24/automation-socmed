const update_user_account = require("../../controller/update.user");
const global_response = require("../../global_response");
const helper_follow_ig = require("../../helper/follow.ig");
const { validate_body_follow } = require("../../helper/validation");

async function follow_ig(req, res) {
  try {
    const check_validate = await validate_body_follow(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, profile_link } = req.body;

    const { headless } = req.query;

    const final_result = await helper_follow_ig(
      user_id,
      profile_link,
      headless
    );

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    const { user_id } = req.body;
    await update_user_account(user_id, error.toString());
    res.status(400).json(global_response("FAILED", 400, error.toString()));
  }
}

module.exports = follow_ig;
