const global_response = require("../../global_response");
const { validate_body_like } = require("../../helper/validation");
const test_worker = require("../../helper/worker/worker");
const helper_like_fb = require("../../services/facebook/like.fb");

async function like_fb_multiple(req, res) {
  try {
    const check_validate = await validate_body_like(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link } = req.body;

    const { headless } = req.query;

    res.status(200).json(global_response("success", 200, "processing data"));

    await test_worker(
      user_id,
      post_link,
      helper_like_fb,
      headless,
      "Like Facebook"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = like_fb_multiple;
