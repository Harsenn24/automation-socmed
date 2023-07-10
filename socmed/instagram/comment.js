const global_response = require("../../global_response");
const { validate_body_comment } = require("../../helper/validation");
const helper_comment_ig = require("../../helper/comment.ig");
const update_user_account = require("../../controller/update.user");

async function comment_ig(req, res) {
  try {
    const check_validate = await validate_body_comment(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link, user_comment } = req.body;

    const { headless } = req.query;

    let final_result = await helper_comment_ig(
      user_id,
      post_link,
      user_comment,
      headless
    );

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    const { user_id } = req.body;

    await update_user_account(user_id, error.message);

    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = comment_ig;
