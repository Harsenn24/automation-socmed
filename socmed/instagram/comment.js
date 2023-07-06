const global_response = require("../../global_response");
const { validate_body_comment } = require("../../helper/validation");
const helper_comment_ig = require("../../helper/comment.ig");

async function comment_ig(req, res) {
  try {
    const check_validate = await validate_body_comment(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link, user_comment } = req.body;

    let final_result = await helper_comment_ig(
      user_id,
      post_link,
      user_comment
    );

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("ERROR", 400, error));
  }
}

module.exports = comment_ig;
