const global_response = require("../../global_response");
const { validate_body_follow } = require("../../helper/validation");
const helper_follow_fb = require("../../helper/follow.fb");

async function follow_fb(req, res) {
  try {
    const check_validate = await validate_body_follow(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, profile_link } = req.body;

    const final_result = await helper_follow_fb(user_id, profile_link);

    res.status(200).json(global_response("SUCCESS", 200, final_result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error));
  }
}

module.exports = follow_fb;
