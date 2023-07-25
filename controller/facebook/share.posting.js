const global_response = require("../../global_response");
const helper_share_posting_fb = require("../../services/facebook/share.posting.fb");
const test_worker = require("../../helper/worker/worker");

async function share_posting_fb(req, res) {
  try {
    const { user_data, post_link } = req.body;

    const { headless } = req.query;

    if (!user_data) {
      throw { message: "user data is required" };
    }

    if (!post_link) {
      throw { message: "post link is required" };
    }

    res.status(200).json(global_response("success", 200, "processing data"));

    await test_worker(
      user_data,
      post_link,
      helper_share_posting_fb,
      headless,
      "Share Facebook Posting"
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = share_posting_fb;
