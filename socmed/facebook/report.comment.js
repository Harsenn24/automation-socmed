const update_user_account = require("../../controller/update.user");
const global_response = require("../../global_response");
const check_report_issue = require("../../helper/check_report_issue");
const helper_report_comment_fb = require("../../helper/report/report.comment.fb");

async function report_comment_fb(req, res) {
  try {
    const { post_link, user_id, report_issue, sub_report_1, comment_link } =
      req.body;

    const check_report = await check_report_issue(report_issue, sub_report_1);

    if (check_report) {
      throw { message: check_report.message };
    }

    if (!post_link) {
      throw { message: "post link is required" };
    }

    if (!user_id) {
      throw { message: "user id is required" };
    }

    if (!report_issue) {
      throw { message: "report issue is required" };
    }

    if (!sub_report_1) {
      throw { message: "sub report is required" };
    }

    if (!comment_link) {
      throw { message: "comment link is required" };
    }

    const { headless } = req.query;

    const final_result = await helper_report_comment_fb(
      user_id,
      post_link,
      headless,
      report_issue,
      sub_report_1,
      comment_link
    );

    await update_user_account(user_id, null, true);

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    const { user_id } = req.body;

    await update_user_account(user_id, error.message, false);

    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = report_comment_fb;
