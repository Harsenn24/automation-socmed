async function check_report_issue(report_issue, sub_report, activity) {
  try {
    let list_report;

    if (activity === "Report Facebook User") {
      list_report = require("../data_adspower/report_user.json");
    } else if (
      activity === "Report Instagram Comment" ||
      activity === "Report Instagram User"
    ) {
      list_report = require("../data_adspower/report.ig.json");
    } else {
      list_report = require("../data_adspower/report.json");
    }

    const matchingIssue = list_report.find(
      (issue) => issue.report_issue === report_issue
    );

    if (!matchingIssue) {
      throw { message: "report issue is incorrect" };
    }

    const subReportOptions = matchingIssue.sub_report_1;
    if (sub_report && subReportOptions.length > 0) {
      if (!subReportOptions.includes(sub_report)) {
        throw { message: "sub report is incorrect" };
      }
    }
  } catch (error) {
    console.log(`error from check report issue : ${error}`);
    return error;
  }
}

module.exports = check_report_issue;
