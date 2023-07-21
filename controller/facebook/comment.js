const global_response = require("../../global_response");
const { validate_body_comment_multiple } = require("../../helper/validation");
const test_worker = require("../../helper/worker/worker");
const helper_comment_fb = require("../../services/facebook/comment.fb");

async function multiple_comment_fb(req, res) {
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
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = multiple_comment_fb;
