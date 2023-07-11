const global_response = require("../../global_response");
const helper_comment_fb = require("../../helper/comment.fb");
const test_worker = require("../../helper/testworker.js");
const { validate_body_comment_multiple } = require("../../helper/validation");

async function multiple_comment_fb(req, res) {
  try {
    const check_validate = await validate_body_comment_multiple(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }
    const { user_data, post_link } = req.body;

    const { headless } = req.query;

    const result = await test_worker(
      user_data,
      post_link,
      helper_comment_fb,
      "comment",
      headless
    );

    res.status(200).json(global_response("Success", 200, result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.toString()));
  }
}

module.exports = multiple_comment_fb;
