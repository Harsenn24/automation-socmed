const global_response = require("../../global_response");
const test_worker = require("../../helper/worker/worker");
const service_status_twitter = require("../../services/twitter/status");

async function status_twitter(req, res) {
  try {
    const { user_data } = req.body;

    if (!user_data) {
      throw { message: "user data is required" };
    }

    const { headless } = req.query;

    res.status(200).json(global_response("Success", 200, "processing data"));

    await test_worker(
      user_data,
      null,
      service_status_twitter,
      headless,
      "Posting Status Twitter"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = status_twitter;
