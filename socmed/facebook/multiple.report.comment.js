const global_response = require("../../global_response");
const helper_report_comment_fb = require("../../helper/report/report.comment.fb");
const test_worker = require("../../helper/testworker.js.js");

async function report_comment_fb_multiple(req, res) {
  try {
    const { post_link, user_data } = req.body;

    console.log(post_link);

    console.log(user_data);

    if (!post_link) {
      throw { message: "post link is required" };
    }

    if (!user_data) {
      throw { message: "user data is required" };
    }

    const { headless } = req.query;

    const final_result = await test_worker(
      user_data,
      post_link,
      helper_report_comment_fb,
      "report_comment",
      headless
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = report_comment_fb_multiple;