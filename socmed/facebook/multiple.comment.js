const processJobs = require("../../helper/worker");

async function multiple_comment_fb(req, res) {
  try {
    const check_validate = await validate_body_comment(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link } = req.body;

    const result = await processJobs(user_id, post_link, "ig", "comment");
  } catch (error) {}
}
