const global_response = require("../global_response");
const helper_comment_fb = require("../helper/facebook/comment.fb");
const { validate_body_comment_multiple } = require("../helper/validation");
const test_worker = require("../helper/worker/worker");

async function test_api(req, res) {
  try {
    const check_validate = await validate_body_comment_multiple(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_data, post_link } = req.body;

    const { headless } = req.query;

    res.status(200).json(global_response("success", 200, "processing data"));

    await test_worker(
      user_data,
      post_link,
      helper_comment_fb,
      headless,
      "Comment Facebook"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("failed", 200, error.message));
  }
}

module.exports = test_api;
