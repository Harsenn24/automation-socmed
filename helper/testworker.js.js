async function test_worker(users_queue, post_link, helper_fn, action) {
  try {
    const result = {
      success: [],
      failed: [],
    };

    const processNextUser = async () => {
      if (users_queue.length > 0) {
        let by_user = users_queue.shift();
        if (action === "comment") {
          let user_id = by_user.user;
          try {
            const user_comment = by_user.comment;

            const process_like = await helper_fn(
              user_id,
              post_link,
              user_comment
            );

            const result_success = { user: user_id, message: process_like };
            result.success.push(result_success);
          } catch (error) {
            const result_failed = { user: user_id, message: error.message };
            result.failed.push(result_failed);
            await processNextUser();
            return error;
          }
        } else {
          try {
            const result_like = await helper_fn(by_user, post_link);
            const result_success = { user: by_user, message: result_like };
            result.success.push(result_success);
          } catch (error) {
            const result_failed = { user: by_user, message: error.message };
            result.failed.push(result_failed);
            await processNextUser();
            return error;
          }
        }
        await processNextUser();
      } else {
        console.log("All job are done");
      }
    };

    await processNextUser();

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = test_worker;
