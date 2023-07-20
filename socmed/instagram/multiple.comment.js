const global_response = require("../../global_response");
const helper_comment_ig = require("../../helper/instagram/comment.ig");
const { validate_body_comment_multiple } = require("../../helper/validation");
const test_worker = require("../../helper/worker/worker");


async function comment_ig_multiple(req, res) {
  try {
    const check_validate = await validate_body_comment_multiple(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_data, post_link } = req.body;

    const { headless } = req.query;

    const final_result = await test_worker(
      user_data,
      post_link,
      helper_comment_ig,
      "comment",
      headless
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.toString()));
  }
}

module.exports = comment_ig_multiple;
