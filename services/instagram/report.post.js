const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");
const sub_report_ig = require("../../helper/sub.report.ig");

async function service_report_post_ig(
  user_id,
  profile_link,
  headless,
  report_issue,
  sub_report_1,
  comment_link_input
) {
  const data = await headless_axios(headless, user_id);

  if (data.msg === "Failed to start browser") {
    throw {
      message: `User ${user_id} is having a problem, try a different user id please`,
    };
  }

  const puppeteerUrl = data.data.ws.puppeteer;

  const browser = await headless_puppeteer(headless, puppeteerUrl);

  const pages = await browser.pages(0);

  const page = pages[0];

  await page.goto(profile_link);

  let final_result = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        await page.waitForSelector('svg[aria-label="Opsi lainnya"]');

        await page.click('svg[aria-label="Opsi lainnya"]');

        const selector_report = 'button[class="_a9-- _a9-_"]';

        await page.waitForSelector(selector_report);

        const option_to_report = await page.$$(selector_report);

        for (const option of option_to_report) {
          const text_content = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (text_content === "Laporkan") {
            await option.click();
          }
        }

        const option_main_report = await option_choose(
          page,
          "div",
          "x9f619",
          "Ini adalah spam"
        );

        for (const option of option_main_report) {
          const text_content = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (text_content === report_issue) {
            await option.click();

            await sub_report_ig(page, report_issue, sub_report_1);
          }
        }

        setTimeout(async () => {
          await screenshoot(page, user_id, "Report-Post-Instagram");

          await page.waitForSelector('button[class="_acan _acap _acas _aj1-"]');

          const button_send = await page.$(
            'button[class="_acan _acap _acas _aj1-"]'
          );

          await button_send.click();

          console.log(`account ${user_id} : success report instagram post`);

          await browser.close();
        }, 5000);
      } catch (error) {
        await browser.close();
        console.log(`account ${user_id} : ${error}}`);
        reject(error.message);
      }
    }, 5000);
  });

  return final_result;
}

async function option_choose(page, head, class_name, text_content) {
  const xpathExpression = `//${head}[contains(@class, "${class_name}") and contains(text(), "${text_content}")]`;

  await page.waitForXPath(xpathExpression);

  const [firstElementHandle] = await page.$x(xpathExpression);

  const classOfFirstElement = await firstElementHandle.evaluate((node) =>
    node.getAttribute("class")
  );

  const xpathExpressionWithClass = `//${head}[contains(@class, "${classOfFirstElement}")]`;

  const elementsWithSameClass = await page.$x(xpathExpressionWithClass);

  return elementsWithSameClass;
}

module.exports = service_report_post_ig;
