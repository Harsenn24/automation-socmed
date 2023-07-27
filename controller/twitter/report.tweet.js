const global_response = require("../../global_response");
const test_worker = require("../../helper/worker/worker");
const service_report_tweet = require("../../services/twitter/report.tweet");

async function report_tweet(req, res) {
  try {
    const { profile_link, user_data } = req.body;

    if (!user_data) {
      throw { message: "user data is required" };
    }

    if (!profile_link) {
      throw { message: "profile link is required" };
    }

    const { headless } = req.query;

    res
      .status(200)
      .json(
        global_response("Success", 200, "processing data report tweet ...")
      );

    await test_worker(
      user_data,
      profile_link,
      service_report_tweet,
      headless,
      "Report Tweet User"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = report_tweet;
