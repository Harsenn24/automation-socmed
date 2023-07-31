const check_report_twitter = require("../check_report_twitter");

async function processComment(
  by_user,
  post_link,
  helper_fn,
  headless,
  result,
  processNextUser,
  activity
) {
  let user_id = by_user.user;

  try {
    const user_comment = by_user.comment;

    await helper_fn(user_id, post_link, user_comment, headless);

    const result_success = {
      user_id,
      activity,
      status: true,
      error_message: null,
    };
    result.success.push(result_success);
  } catch (error) {
    const result_failed = {
      user_id,
      activity,
      status: false,
      error_message: error.message,
    };
    result.failed.push(result_failed);
    await processNextUser();
    return error;
  }
}

async function validationReport(
  by_user,
  post_link,
  helper_fn,
  headless,
  result,
  check_report_issue,
  processNextUser,
  activity
) {
  let user_id = by_user.user_id;

  try {
    const report_issue = by_user.report_issue;

    const sub_report = by_user.subReport;

    const check_input = await check_report_issue(
      report_issue,
      sub_report,
      activity
    );

    if (check_input) {
      throw { message: check_input.message };
    }

    if (
      activity === "Report Facebook Post" ||
      activity === "Report Facebook User"
    ) {
      await helper_fn(user_id, post_link, headless, report_issue, sub_report);
    } else {
      console.log("masuk else ");
      const id_comment = by_user.id_comment;

      await helper_fn(
        user_id,
        post_link,
        headless,
        report_issue,
        sub_report,
        id_comment
      );
    }

    const result_success = {
      user_id,
      activity,
      status: true,
      error_message: null,
    };
    result.success.push(result_success);
  } catch (error) {
    const result_failed = {
      user_id,
      activity,
      status: false,
      error_message: error.message,
    };
    result.failed.push(result_failed);
    await processNextUser();
    return error;
  }
}

async function validationStatus(
  by_user,
  check_feeling_activity_fb,
  helper_fn,
  headless,
  result,
  processNextUser,
  activity
) {
  let user_id = by_user.user_id;
  let user_message = by_user.status_message;
  let image_video = by_user.image_video;
  let feeling_activity = by_user.feeling_activity;

  if (!feeling_activity) {
    feeling_activity = "";
  }

  if (feeling_activity) {
    const check_feeling_activity = await check_feeling_activity_fb(
      feeling_activity
    );

    if (check_feeling_activity) {
      throw { message: check_feeling_activity.message };
    }
  }

  if (!image_video) {
    image_video = "";
  }

  try {
    await helper_fn(
      user_id,
      user_message,
      headless,
      image_video,
      feeling_activity
    );

    const result_success = {
      user_id,
      activity,
      status: true,
      error_message: null,
    };

    result.success.push(result_success);
  } catch (error) {
    const result_failed = {
      user_id,
      activity,
      status: false,
      error_message: error.message,
    };
    result.failed.push(result_failed);
    await processNextUser();
    return error;
  }
}

async function validationElse(
  by_user,
  helper_fn,
  headless,
  result,
  processNextUser,
  activity,
  post_link
) {
  try {
    await helper_fn(by_user, post_link, headless);
    const result_success = {
      user_id: by_user,
      activity,
      status: true,
      error_message: null,
    };
    result.success.push(result_success);
  } catch (error) {
    const result_failed = {
      user_id: by_user,
      activity,
      status: false,
      error_message: error.message,
    };
    result.failed.push(result_failed);
    await processNextUser();
    return error;
  }
}

async function validationReportTwitter(
  user_data,
  account,
  helper_fn,
  headless,
  result,
  processNextUser,
  activity
) {
  const user_id = user_data.user_id;

  const report = user_data.report;

  try {
    const check_report = await check_report_twitter(report);

    if (check_report) {
      throw { message: check_report.message };
    }

    await helper_fn(user_id, account, headless, report);

    const result_success = {
      user_id: user_id,
      activity,
      status: true,
      error_message: null,
    };
    result.success.push(result_success);
  } catch (error) {
    const result_failed = {
      user_id: user_id,
      activity,
      status: false,
      error_message: error.message,
    };
    result.failed.push(result_failed);
    await processNextUser();
    return error;
  }
}

module.exports = {
  processComment,
  validationReport,
  validationStatus,
  validationElse,
  validationReportTwitter,
};
