const global_response = require("../../global_response");
const helper_share_posting_fb = require("../../helper/facebook/share.posting.fb");
const test_worker = require("../../helper/worker/worker.js");

async function share_fb_multiple(req, res) {
  try {
    const { post_link, user_data } = req.body;

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
      helper_share_posting_fb,
      "posting_facebook",
      headless
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = share_fb_multiple;
