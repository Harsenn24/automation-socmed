const hate_speech = require("./hate.speech");

async function report_action(option, report_issue, page, sub_report_1) {
  if (report_issue === "Terorisme") {
    await option.click();
    return;
  }
  if (report_issue === "Ujaran kebencian") {
    await option.click();
    console.log("masuk ujaran kebencian");
    await hate_speech(page, sub_report_1);
    return;
  }
  if (report_issue === "Penjualan tidak resmi") {
    return;
  }
  if (report_issue === "Spam") {
    return;
  }
  if (report_issue === "Informasi palsu") {
    return;
  }
  if (report_issue === "Bunuh diri atau melukai diri sendiri") {
    return;
  }
  if (report_issue === "Pelecehan") {
    return;
  }
  if (report_issue === "Kekerasan") {
    return;
  }
  if (report_issue === "Ketelanjangan") {
    return;
  }
  if (report_issue === "Hal Lain") {
    return;
  } else {
    throw {
      message: "report issue doesn't match with the facebook report list",
    };
  }
}

module.exports = report_action;
