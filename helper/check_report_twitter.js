async function check_report_twitter(report_issue) {
  try {
    let list_report = require("../data_adspower/report.user.twitter.json");

    const matchingIssue = list_report.find(
      (issue) => issue === report_issue
    );

    if (!matchingIssue) {
      throw { message: "report issue is incorrect" };
    }
  } catch (error) {
    console.log(`error from check report issue twitter : ${error.message}`);
    return error;
  }
}

module.exports = check_report_twitter;
