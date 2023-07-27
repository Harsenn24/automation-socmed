const global_response = require("../../global_response");
const test_worker = require("../../helper/worker/worker");
const helper_follow_twitter = require("../../services/twitter/follow");

async function follow_twitter(req, res) {
  try {
    const { user_id, profile_link } = req.body;

    if (!user_id) {
      throw { message: "user id is required" };
    }

    if (!profile_link) {
      throw { message: "profile link is required" };
    }

    const { headless } = req.query;

    res.status(200).json(global_response("SUCCESS", 200, "processing data"));

    await test_worker(
      user_id,
      profile_link,
      helper_follow_twitter,
      headless,
      "Follow Twitter"
    );
  } catch (error) {
    console.log(error);

    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = follow_twitter;
