const global_response = require("../../global_response");
const helper_like_ig = require("../../helper/like");
const validate_body = require("../../helper/validation");

async function like_fb(req, res) {
  try {
    const check_validate = await validate_body(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const final_result = await helper_like_ig(user_id, post_link);

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error));
  }
}

module.exports = like_fb;
