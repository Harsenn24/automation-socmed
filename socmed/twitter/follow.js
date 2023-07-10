const update_user_account = require("../../controller/update.user");
const global_response = require("../../global_response");
const helper_follow_twitter = require("../../helper/follow.twitter");

async function follow_twitter(req, res) {
  try {
    const { user_id, profile_link } = req.body;

    const { headless } = req.query;

    const final_result = await helper_follow_twitter(
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

module.exports = follow_twitter;
