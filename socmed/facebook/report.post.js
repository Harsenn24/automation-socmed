const global_response = require("../../global_response");
const helper_report_post_fb = require("../../helper/report.post.fb");

async function report_post_fb(req, res) {
  try {
    const { post_link, user_id, report_issue } = req.body;

    const { headless } = req.query;

    const final_result = await helper_report_post_fb(
      user_id,
      post_link,
      headless,
      report_issue
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = report_post_fb;
