const global_response = require("../../global_response");
const helper_like_ig = require("../../helper/like.ig");
const test_worker = require("../../helper/testworker.js");
const { validate_body_like } = require("../../helper/validation");

async function like_ig_multiple(req, res) {
  try {
    const check_validate = await validate_body_like(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link } = req.body;

    const { headless } = req.query;

    const result = await test_worker(
      user_id,
      post_link,
      helper_like_ig,
      "like",
      headless
    );

    res.status(200).json(global_response("Success", 200, result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.toString()));
  }
}

module.exports = like_ig_multiple;
