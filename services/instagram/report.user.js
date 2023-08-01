const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");
const sub_report_ig = require("../../helper/sub.report.ig");

async function service_report_user_ig(
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

        const option_selector = 'svg[aria-label="Opsi"]';

        await page.waitForSelector(option_selector);

        await page.click(option_selector);

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

        const selector_report_account =
          'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xw7yly9 xat24cr x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"';

        await page.waitForSelector(selector_report_account);

        const element_report_account = await page.$$(selector_report_account);

        for (const option of element_report_account) {
          const selector_account =
            'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]';

          await option.waitForSelector(selector_account);

          const option_choose = await page.$$(selector_account);

          for (const option_text of option_choose) {
            const text_content = await option_text.evaluate((el) =>
              el.textContent.trim()
            );

            if (text_content === "Laporkan Akun") {
              await option_text.click();
            }
          }
        }

        const selector_report_type =
          'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xdj266r x1yztbdb x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]';

        await page.waitForSelector(selector_report_type);

        const element_report_type = await page.$(selector_report_type);

        await element_report_type.waitForSelector(
          'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]'
        );

        const multiple_choice_type = await element_report_type.$$(
          'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]'
        );

        for (const option_choice of multiple_choice_type) {
          const text_content = await option_choice.evaluate((el) =>
            el.textContent.trim()
          );

          if (
            text_content ===
            "Konten postingannya yang tidak seharusnya berada di Instagram"
          ) {
            await option_choice.click();
          }
        }

        const classToWaitFor = "x9f619";

        const textToWaitFor = "Ini adalah spam";

        const xpathExpression = `//div[contains(@class, "${classToWaitFor}") and contains(text(), "${textToWaitFor}")]`;

        await page.waitForXPath(xpathExpression);

        const [firstElementHandle] = await page.$x(xpathExpression);

        const classOfFirstElement = await firstElementHandle.evaluate((node) =>
          node.getAttribute("class")
        );

        const xpathExpressionWithClass = `//div[contains(@class, "${classOfFirstElement}")]`;

        const elementsWithSameClass = await page.$x(xpathExpressionWithClass);

        for (const option of elementsWithSameClass) {
          const text_content = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (text_content === report_issue) {
            await option.click();

            await sub_report_ig(page, report_issue, sub_report_1);
          }
        }

        setTimeout(async () => {
          await screenshoot(page, user_id, "Report-User-Instagram");

          await page.waitForSelector('button[class="_acan _acap _acas _aj1-"]');

          const button_send = await page.$(
            'button[class="_acan _acap _acas _aj1-"]'
          );

          await button_send.click();

          console.log(`account ${user_id} : success report instagram user`);

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

module.exports = service_report_user_ig;
