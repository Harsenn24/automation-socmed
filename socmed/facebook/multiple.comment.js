const global_response = require("../../global_response");
const processJobs = require("../../helper/worker");

async function multiple_comment_fb(req, res) {
  try {
    const { user_data, post_link } = req.body;

    if (!user_data) {
      throw { message: "User data is required" };
    }

    if (!post_link) {
      throw { message: "Post link is required" };
    }

    console.log(user_data, post_link)

    const result = await processJobs(user_data, post_link, "fb", "comment");

    res.status(200).json(global_response("Success", 200, result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error));
  }
}

module.exports = multiple_comment_fb;
