const global_response = require("../../global_response");
const helper_report_user_fb = require("../../helper/report/report.user.fb");

async function report_user_fb(req, res) {
  try {
    const { profile_link, user_id, report_issue, sub_report } = req.body;

    if (!user_id) {
      throw { message: "user id is required" };
    }

    if (!profile_link) {
      throw { message: "profile link is required" };
    }

    const { headless } = req.query;

    const final_result = await helper_report_user_fb(
      user_id,
      profile_link,
      headless,
      report_issue,
      sub_report
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = report_user_fb;
