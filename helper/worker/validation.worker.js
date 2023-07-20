async function processComment(
  by_user,
  post_link,
  helper_fn,
  headless,
  result,
  processNextUser
) {
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
}

async function validationReport(
  by_user,
  post_link,
  helper_fn,
  headless,
  result,
  check_report_issue,
  processNextUser
) {
  let user_id = by_user.user_id;
  try {
    const report_issue = by_user.report_issue;
    const sub_report = by_user.subReport;

    const check_input = await check_report_issue(report_issue, sub_report);

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
}

async function validationStatus(
  by_user,
  check_feeling_activity_fb,
  helper_fn,
  headless,
  result,
  processNextUser
) {
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
}

async function validationElse(
  by_user,
  helper_fn,
  headless,
  result,
  processNextUser
) {
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

module.exports = {
  processComment,
  validationReport,
  validationStatus,
  validationElse,
};
