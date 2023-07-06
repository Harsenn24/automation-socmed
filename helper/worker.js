const helper_like_fb = require("./like.fb");
const helper_like_ig = require("./like.ig");

async function processJobs(users_queue, post_link, socmed) {
  try {
    const result = {
      success: [],
      failed: [],
    };

    const processNextUser = async () => {
      if (users_queue.length > 0) {
        const user_id = users_queue.shift();

        if (socmed === "fb") {
          try {
            await helper_like_fb(user_id, post_link);
            result.success.push(user_id);
          } catch (error) {
            result.failed.push(user_id);
          }
        } else {
          try {
            await helper_like_ig(user_id, post_link);
            result.success.push(user_id);
          } catch (error) {
            result.failed.push(user_id);
          }
        }

        await processNextUser();
      } else {
        console.log("all job finish");
      }
    };

    await processNextUser();

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = processJobs;
