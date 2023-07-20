const update_user_account = require("../controller/update.user");
const check_feeling_activity_fb = require("./check_feeling_activity_fb");
const check_report_issue = require("./check_report_issue");

async function test_worker(
  users_queue,
  post_link,
  helper_fn,
  action,
  headless
) {
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
              user_comment,
              headless
            );

            const result_success = { user: user_id, message: process_like };
            result.success.push(result_success);
          } catch (error) {
            const result_failed = { user: user_id, message: error.message };
            result.failed.push(result_failed);
            await processNextUser();
            return error;
          }
        } else if (action === "report_post" || action === "report_comment") {
          let user_id = by_user.user_id;
          try {
            const report_issue = by_user.report_issue;
            const sub_report = by_user.subReport;

            const check_input = await check_report_issue(
              report_issue,
              sub_report
            );

            if (check_input) {
              throw { message: check_input.message };
            }

            let process_report;

            if (action === "report_post") {
              process_report = await helper_fn(
                user_id,
                post_link,
                headless,
                report_issue,
                sub_report
              );
            } else {
              const id_comment = by_user.id_comment;
              process_report = await helper_fn(
                user_id,
                post_link,
                headless,
                report_issue,
                sub_report,
                id_comment
              );
            }

            const result_success = { user: user_id, message: process_report };
            result.success.push(result_success);
          } catch (error) {
            const result_failed = { user: user_id, message: error.message };
            result.failed.push(result_failed);
            await processNextUser();
            return error;
          }
        } else if (action === "posting_status") {
          let user_id = by_user.user_id;
          let user_message = by_user.status_message;
          let image_video = by_user.image_video;
          let feeling_activity = by_user.feeling_activity;

          const check_feeling_activity = await check_feeling_activity_fb(
            feeling_activity
          );

          if (check_feeling_activity) {
            throw { message: check_feeling_activity.message };
          }

          if (!image_video) {
            image_video = "";
          }

          if (!feeling_activity) {
            feeling_activity = "";
          }

          try {
            const result_success = await helper_fn(
              user_id,
              user_message,
              headless,
              image_video,
              feeling_activity
            );
            result.success.push(result_success);
          } catch (error) {
            const result_failed = { user: user_id, message: error.message };
            result.failed.push(result_failed);
            await processNextUser();
            return error;
          }
        } else {
          try {
            const result_like = await helper_fn(by_user, post_link, headless);
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

    if (result.failed.length > 0) {
      for (const item of result.failed) {
        const { user, message } = item;
        await update_user_account(user, message, false);
      }
    }

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = test_worker;
