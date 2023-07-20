const global_response = require("../../global_response");
const helper_share_posting_fb = require("../../helper/facebook/share.posting.fb");

async function share_posting_fb(req, res) {
  try {
    const { user_id, post_link } = req.body;

    const { headless } = req.query;

    if (!user_id) {
      throw { message: "user id is required" };
    }

    if (!post_link) {
      throw { message: "post link is required" };
    }

    const final_result = await helper_share_posting_fb(
      user_id,
      post_link,
      headless
    );

    res.status(200).json(global_response("success", 200, final_result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = share_posting_fb;
