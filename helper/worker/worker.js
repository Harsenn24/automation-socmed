const check_feeling_activity_fb = require("../check_feeling_activity_fb");
const check_report_issue = require("../check_report_issue");
const {
  processComment,
  validationReport,
  validationStatus,
  validationElse,
  validationReportTwitter,
} = require("./validation.worker");
const { AdminActivity } = require("../../models/index");

async function test_worker(
  users_queue,
  post_link,
  helper_fn,
  headless,
  activity
) {
  try {
    const result = {
      success: [],
      failed: [],
    };

    const processNextUser = async () => {
      if (users_queue.length > 0) {
        let by_user = users_queue.shift();
        if (
          activity === "Comment Facebook" ||
          activity === "Retweet Comment Twitter" ||
          activity === "Comment Instagram"
        ) {
          await processComment(
            by_user,
            post_link,
            helper_fn,
            headless,
            result,
            processNextUser,
            activity
          );
        } else if (
          activity === "Report Facebook Post" ||
          activity === "Report Facebook Comment" ||
          activity === "Report Facebook User" ||
          activity === "Report Instagram Comment" ||
          activity === "Report Instagram User" ||
          activity === "Report Instagram Post"
        ) {
          await validationReport(
            by_user,
            post_link,
            helper_fn,
            headless,
            result,
            check_report_issue,
            processNextUser,
            activity
          );
        } else if (
          activity === "Posting Status Facebook" ||
          activity === "Posting Status Twitter" ||
          activity === "Posting Feed Instagram"
        ) {
          await validationStatus(
            by_user,
            check_feeling_activity_fb,
            helper_fn,
            headless,
            result,
            processNextUser,
            activity
          );
        } else if (
          activity === "Report Twitter User" ||
          activity === "Report Tweet User"
        ) {
          await validationReportTwitter(
            by_user,
            post_link,
            helper_fn,
            headless,
            result,
            processNextUser,
            activity
          );
        } else {
          await validationElse(
            by_user,
            helper_fn,
            headless,
            result,
            processNextUser,
            activity,
            post_link
          );
        }

        await processNextUser();
      } else {
        console.log("All job are done");
      }
    };

    await processNextUser();

    console.log(result);

    if (result.failed.length > 0) {
      await AdminActivity.bulkCreate(result.failed);
    }

    if (result.success.length > 0) {
      await AdminActivity.bulkCreate(result.success);
    }

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = test_worker;
