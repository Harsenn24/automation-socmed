const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function helper_follow_fb(user_id, profile_link, headless) {
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

  console.log("masuk follow gaes");

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        let selector_follow =
          'span[class^="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft"]';

        await page.waitForSelector(selector_follow);

        const option_follow = await page.$$(selector_follow);

        for (const option of option_follow) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (textContent === "Ikuti") {
            await option.click();
            console.log(`${user_id} success follow facebook account`)
            break;
          }

          if (textContent === "Mengikuti") {
            console.log(`${user_id} already followed this facebook account`)
            break;
          }
        }

        await screenshoot(page, user_id, "Follow-FB");

        resolve("Follow facebook success");

        setTimeout(async () => {
          await browser.close();
        }, 5000);
      } catch (error) {
        // await browser.close();
        reject(error.message);
      }
    }, 5000);
  });
}

module.exports = helper_follow_fb;
