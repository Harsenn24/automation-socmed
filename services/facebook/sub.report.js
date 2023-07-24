async function sub_report(page, sub_report_1) {

  let selector_sub_report =
    'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

  await page.waitForSelector(selector_sub_report);

  const option_sub_report = await page.$$(selector_sub_report);

  let selected_option;

  let check_sub_Report = false;

  for (let i = 0; i < option_sub_report.length; i++) {
    const element = option_sub_report[i];

    const textContent = await element.evaluate((el) => el.textContent.trim());

    if (textContent === sub_report_1) {
      selected_option = element;
      check_sub_Report = true;
    }
  }

  if (!check_sub_Report) {
    throw {
      message: `sub report doesn't match with facebook report list (Ujaran Kebencian)`,
    };
  }

  await selected_option.click();
}

module.exports = sub_report;
