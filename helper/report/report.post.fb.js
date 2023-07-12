const update_user_account = require("../../controller/update.user");
const { headless_axios, headless_puppeteer } = require("../headless");
const sub_report = require("./sub.report");

async function helper_report_post_fb(
  user_id,
  post_link,
  headless,
  report_issue,
  sub_report_1
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

        let selector_three_spot =
          'div[class="xqcrz7y x78zum5 x1qx5ct2 x1y1aw1k x1sxyh0 xwib8y2 xurb0ha xw4jnvo"]';

        await page.waitForSelector(selector_three_spot);

        await page.click(selector_three_spot);

        let selector_report =
          'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen xk50ysn xzsf02u x1yc453h"]';

        await page.waitForSelector(selector_report);

        const options = await page.$$(selector_report);

        for (const option of options) {
          const textContent = await option.evaluate((el) =>
            el.textContent.trim()
          );
          if (textContent === "Laporkan foto") {
            await option.click();
            break;
          }
        }

        let selector_report_options =
          'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

        await page.waitForSelector(selector_report_options);

        const option_report = await page.$$(selector_report_options);

        for (const option of option_report) {
          const textContent = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (textContent === report_issue) {
            if (report_issue === "Terorisme") {
              await option.click();
              break;
            }
            await option.click();

            await sub_report(page, sub_report_1);
            break;
          }
        }

        let selector_send = 'div[aria-label="Kirim"]';

        await page.waitForSelector(selector_send);

        await page.click(selector_send);

        await update_user_account(user_id, null, true);

        resolve(
          `success report post with user ${user_id} with issue ${report_issue} and sub issue ${sub_report_1}`
        );
      } catch (error) {
        console.log(`account ${user_id} : ${error}}`);
        await update_user_account(user_id, error.message, false);
        reject(error);
      } finally {
        // await browser.close();
        console.log("ok");
      }
    }, 5000);
  });

  return final_result;
}

module.exports = helper_report_post_fb;
