const global_response = require("../../global_response");
const helper_follow_ig = require("../../services/instagram/follow.ig");
const { validate_body_follow } = require("../../helper/validation");
const test_worker = require("../../helper/worker/worker");

async function follow_instagram(req, res) {
  try {
    const check_validate = await validate_body_follow(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, profile_link } = req.body;

    const { headless } = req.query;

    res
      .status(200)
      .json(
        global_response("Success", 200, "proccessing data follow instagram ...")
      );

    await test_worker(
      user_id,
      profile_link,
      helper_follow_ig,
      headless,
      "Follow Instagram"
    );
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.toString()));
  }
}

module.exports = follow_instagram;
