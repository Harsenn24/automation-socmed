const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function helper_follow_ig(user_id, profile_link, headless) {
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

        const selector_follow = 'div[class="_aacl _aaco _aacw _aad6 _aade"]';

        await page.waitForSelector(selector_follow);

        const option_follow = await page.$(selector_follow);

        const text_content = await option_follow.evaluate((el) =>
          el.textContent.trim()
        );

        let final_Result;

        if (text_content === "Ikuti") {
          await option_follow.click();
          final_Result = `${user_id} success follow`;
        } else {
          final_Result = `${user_id} already followed`;
        }

        setTimeout(async () => {
          console.log(final_Result);

          await screenshoot(page, user_id, "Follow-Facebook");

          resolve(final_Result);

          await browser.close();
        }, 5000);
      } catch (error) {
        await browser.close();
        console.log(`${user_id} : ${error}}`);
        reject(error);
      }
    }, 5000);
  });

  return final_result;
}

module.exports = helper_follow_ig;
