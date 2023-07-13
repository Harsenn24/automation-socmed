const global_response = require("../../global_response");
const helper_posting_status_fb = require("../../helper/posting.status.fb");

async function posting_status_fb(req, res) {
  try {
    let { user_id, status_message, image_video, feeling_activity } = req.body;

    if (!image_video) {
      image_video = "";
    }

    if (!feeling_activity) {
      image_video = "";
    }

    const { headless } = req.query;

    const final_result = await helper_posting_status_fb(
      user_id,
      status_message,
      headless,
      image_video,
      feeling_activity
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = posting_status_fb;
