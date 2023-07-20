const update_user_account = require("../../controller/update.user");
const check_feeling_activity_fb = require("../facebook/check_feeling_activity_fb");
const check_report_issue = require("../check_report_issue");
const {
  processComment,
  validationReport,
  validationStatus,
  validationElse,
} = require("./validation.worker");

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
          await processComment(
            by_user,
            post_link,
            helper_fn,
            headless,
            result,
            processNextUser
          );
        } else if (action === "report_post" || action === "report_comment") {
          await validationReport(
            by_user,
            post_link,
            helper_fn,
            headless,
            result,
            check_report_issue,
            processNextUser
          );
        } else if (action === "posting_status") {
          await validationStatus(
            by_user,
            check_feeling_activity_fb,
            helper_fn,
            headless,
            result,
            processNextUser
          );
        } else {
          await validationElse(
            by_user,
            helper_fn,
            headless,
            result,
            processNextUser
          );
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
