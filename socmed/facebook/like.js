const global_response = require("../../global_response");
const helper_like_fb = require("../../helper/like.fb");
const {validate_body_like} = require("../../helper/validation");

async function like_fb(req, res) {
  try {
    const check_validate = await validate_body_like(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link } = req.body;

    const final_result = await helper_like_fb(user_id, post_link);

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    console.log(error, "dari errroorrrrrr")
    res.status(400).json(global_response("FAILED", 400, error));
  }
}

module.exports = like_fb;
