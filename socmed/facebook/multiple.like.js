const global_response = require("../../global_response");
const helper_like_ig = require("../../helper/like");
const {validate_body_like} = require("../../helper/validation");

var completedJobs = [];
var uncompletedJobs = [];

async function like_fb_multiple(req, res) {
  try {
    const check_validate = await validate_body_like(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    await processJobs(user_id, post_link);

    completedJobs = [...new Set(completedJobs)];

    let result = { completedJobs, uncompletedJobs };

    res.status(200).json(global_response("Success", 200, result));
  } catch (error) {
    res.status(400).json(global_response("FAILED", 400, error));
  }
}

async function processJobs(users_queue, post_link) {
  try {
    if (users_queue.length > 0) {
      const user_id = users_queue.shift();

      await helper_like_ig(user_id, post_link);

      completedJobs.push(user_id);

      await processJobs(users_queue, post_link);
    } else {
      console.log("all job finish");
    }
  } catch (error) {
    return error;
  }
}

module.exports = like_fb_multiple;
