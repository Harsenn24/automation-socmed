const global_response = require("../../global_response");
const helper_posting_status_fb = require("../../helper/facebook/posting.status.fb");
const test_worker = require("../../helper/worker/worker.js");

async function posting_status_fb_multiple(req, res) {
  try {
    const { user_data } = req.body;

    if (!user_data) {
      throw { message: "user data is required" };
    }

    const { headless } = req.query;

    const final_result = await test_worker(
      user_data,
      null,
      helper_posting_status_fb,
      "posting_status",
      headless
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}



module.exports = posting_status_fb_multiple;
