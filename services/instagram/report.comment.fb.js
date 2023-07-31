const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");
const sub_report_ig = require("../../helper/sub.report.ig");

async function service_report_comment_ig(
  user_id,
  post_link,
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

  await page.goto(post_link);

  let final_result = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const parent_selector = 'li[class="_a9zj _a9zl"]';

        await page.waitForSelector(parent_selector);

        const element_parent = await page.$$(parent_selector);

        for (const option of element_parent) {
          const selector_href =
            'a[class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _a9zg _a6hd"]';

          await option.waitForSelector(selector_href);

          const hrefValue = await option.$eval(selector_href, (element) =>
            element.getAttribute("href")
          );

          if (`https://www.instagram.com${hrefValue}` === post_link) {
            console.log("cocok");

            const selector_option =
              'div[class="x1i10hfl x6umtig x1b1mbwd xaqea5y xav7gou x9f619 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x1ypdohk x78zum5 xl56j7k x1y1aw1k x1sxyh0 xwib8y2 xurb0ha xcdnw81"]';

            await option.waitForSelector(selector_option);

            await option.click(selector_option);
          }
        }

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

        const selector_main_report =
          'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"';

        await page.waitForSelector(selector_main_report);

        const element_main_report = await page.$$(selector_main_report);

        for (const option of element_main_report) {
          const text_content = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (text_content === report_issue) {
            await option.click();

            await sub_report_ig(page, report_issue, sub_report_1);
          }
        }
      } catch (error) {
        // await browser.close();
        console.log(`account ${user_id} : ${error}}`);
        reject(error.message);
      }
    }, 5000);
  });

  return final_result;
}

module.exports = service_report_comment_ig;
