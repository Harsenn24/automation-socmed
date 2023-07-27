const global_response = require("../../global_response");
const test_worker = require("../../helper/worker/worker");
const service_retweet = require("../../services/twitter/retweet");

async function retweet(req, res) {
  try {
    const { user_data, tweet_link } = req.body;

    if (!user_data) {
      throw { message: "user data is required" };
    }

    if (!tweet_link) {
      throw { message: "tweet link is required" };
    }

    const { headless } = req.query;

    res
      .status(200)
      .json(global_response("Success", 200, "processing data retweet . . ."));

    await test_worker(
      user_data,
      tweet_link,
      service_retweet,
      headless,
      "Retweet"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = retweet;
