const helper_comment_fb = require("./comment.fb");
const helper_comment_ig = require("./comment.ig");
const helper_like_fb = require("./like.fb");
const helper_like_ig = require("./like.ig");

async function processJobs(users_queue, post_link, socmed, service) {
  try {
    const result = {
      success: [],
      failed: [],
    };


    const processNextUser = async () => {
      if (users_queue.length > 0) {
        var user_id = users_queue.shift();

        if (socmed === "fb") {
          if (service === "like") {
            try {
              await helper_like_fb(user_id, post_link);

              result.success.push(user_id);
            } catch (error) {
              result.failed.push(user_id);
            }
          } else {
            try {
              const user_fb = user_id.user;

              const comment_fb = user_id.comment;

              await helper_comment_fb(comment_fb, user_fb, post_link);

              result.success.push(user_fb);
            } catch (error) {
              const user_fb = user_id.user;

              result.failed.push(user_fb);
            }
          }
        } else {
          if (service === "like") {
            try {
              await helper_like_ig(user_id, post_link);
              result.success.push(user_id);
            } catch (error) {
              result.failed.push(user_id);
            }
          } else {
            try {
              const user_ig = user_id.user;

              const comment_ig = user_id.comment;

              await helper_comment_ig(user_ig, post_link, comment_ig);

              result.success.push(user_ig);
            } catch (error) {
              const user_ig = user_id.user;

              result.failed.push(user_ig);
            }
          }
        }

        await processNextUser();
      } else {
        console.log(`All ${socmed} ${service} is done!`);
      }
    };

    await processNextUser();

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = processJobs;
