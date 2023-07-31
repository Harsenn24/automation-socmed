const global_response = require("../../global_response");
const helper_comment_ig = require("../../services/instagram/comment.ig");
const { validate_body_comment_multiple } = require("../../helper/validation");
const test_worker = require("../../helper/worker/worker");

async function comment_instagram(req, res) {
  try {
    const check_validate = await validate_body_comment_multiple(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_data, post_link } = req.body;

    const { headless } = req.query;

    res
      .status(200)
      .json(
        global_response("Success", 200, "processing data comment instagram")
      );

    await test_worker(
      user_data,
      post_link,
      helper_comment_ig,
      headless,
      "Comment Instagram"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = comment_instagram;
