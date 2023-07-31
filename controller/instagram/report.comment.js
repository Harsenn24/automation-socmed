const global_response = require("../../global_response");
const test_worker = require("../../helper/worker/worker.js");
const service_report_comment_ig = require("../../services/instagram/report.comment.fb");

async function report_comment_instagram(req, res) {
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
        global_response(
          "Success",
          200,
          "processing data report comment instagram"
        )
      );

    await test_worker(
      user_data,
      post_link,
      service_report_comment_ig,
      headless,
      "Report Instagram Comment"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = report_comment_instagram;
