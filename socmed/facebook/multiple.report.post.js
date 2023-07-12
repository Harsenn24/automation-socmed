const update_user_account = require("../../controller/update.user");
const global_response = require("../../global_response");
const helper_report_post_fb = require("../../helper/report/report.post.fb");
const test_worker = require("../../helper/testworker.js");

async function report_post_fb_multiple(req, res) {
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
      helper_report_post_fb,
      "report_post",
      headless
    );

    await update_user_account(user_id, null, true);

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    const { user_id } = req.body;

    await update_user_account(user_id, error.message, false);

    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = report_post_fb_multiple;
