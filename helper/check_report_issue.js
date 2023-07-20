async function check_report_issue(report_issue, sub_report) {
  try {
    let list_report = require("../data_adspower/report.json");

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
    console.log(error.message);
    return error;
  }
}

module.exports = check_report_issue;
