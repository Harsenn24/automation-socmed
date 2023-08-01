const global_response = require("../../global_response");
const test_worker = require("../../helper/worker/worker");
const service_report_post_ig = require("../../services/instagram/report.post");

async function report_post_instagram(req, res) {
  try {
    const { post_link, user_data } = req.body;

    if (!post_link) {
      throw { message: "post link is required" };
    }

    if (!user_data) {
      throw { message: "user data is required" };
    }

    const { headless } = req.query;

    res
      .status(200)
      .json(
        global_response("Success", 200, "processing data report post instagram")
      );

    await test_worker(
      user_data,
      post_link,
      service_report_post_ig,
      headless,
      "Report Instagram Post"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = report_post_instagram;
