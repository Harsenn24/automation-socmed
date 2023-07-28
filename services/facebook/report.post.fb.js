const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");
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

        const selector_report =
          'div[class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou xe8uvvx x1hl2dhg xggy1nq x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x87ps6o x1lku1pv x1a2a7pz xjyslct x9f619 x1ypdohk x78zum5 x1q0g3np x2lah0s xnqzcj9 x1gh759c xdj266r xat24cr x1344otq x1de53dj x1n2onr6 x16tdsg8 x1ja2u2z x6s0dn4 x1y1aw1k xwib8y2"]';

        await page.waitForSelector(selector_report);

        const commentElements = await page.$$(selector_report);

        for (const commentElement of commentElements) {
          const text_content = await page.evaluate(
            (element) => element.querySelector("span").textContent.trim(),
            commentElement
          );

          if (text_content === "Laporkan foto") {
            await commentElement.click();
            break;
          }
        }

        let selector_report_options =
          'span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

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

        let selector_final =
          'span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft"]';

        await page.waitForSelector(selector_final);

        const option_final = await page.$$(selector_final);

        for (const option of option_final) {
          const textContent = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (textContent === "Kirim") {
            await option.click();
            console.log("success report this post");
            break;
          }
          if (textContent === "Selesai") {
            console.log("You have been report with this issue");
            break;
          }
        }

        setTimeout(async () => {
          await screenshoot(page, user_id, "report-post-FB");

          console.log(user_id + " success report facebook post");

          resolve(
            `success report post with user ${user_id} with issue ${report_issue} and sub issue ${sub_report_1}`
          );

          await browser.close();
        }, 8000);
      } catch (error) {
        await browser.close();
        console.log(`account ${user_id} : ${error}}`);
        reject(error.message);
      }
    }, 5000);
  });

  return final_result;
}

module.exports = helper_report_post_fb;
