const global_response = require("../../global_response");
const helper_report_post_fb = require("../../services/facebook/report.post.fb");
const test_worker = require("../../helper/worker/worker.js");

async function report_post_fb_multiple(req, res) {
  try {
    const { post_link, user_data } = req.body;

    if (!post_link) {
      throw { message: "post link is required" };
    }

    if (!user_data) {
      throw { message: "user data is required" };
    }

    const { headless } = req.query;

    res.status(200).json(global_response("Success", 200, "processing data"));

    await test_worker(
      user_data,
      post_link,
      helper_report_post_fb,
      headless,
      "Report Facebook Post"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = report_post_fb_multiple;
