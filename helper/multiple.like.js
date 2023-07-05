const helper_like_ig = require("./like");

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

module.exports = processJobs