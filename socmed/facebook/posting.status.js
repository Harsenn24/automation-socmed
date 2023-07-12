const global_response = require("../../global_response");
const helper_posting_status_fb = require("../../helper/posting.status.fb");

async function posting_status_fb(req, res) {
  try {
    const { user_id, status_message } = req.body;

    const { headless } = req.query;

    const final_result = await helper_posting_status_fb(
      user_id,
      status_message,
      headless
    );

    res.status(200).json(global_response("Success", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error.message));
  }
}

module.exports = posting_status_fb;
