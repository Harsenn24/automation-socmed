const update_user_account = require("../controller/update.user");
const { headless_axios, headless_puppeteer } = require("./headless");
const screenshoot = require("./screenshoot");

async function helper_share_posting_fb(user_id, post_link, headless) {
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

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        let selector_share =
          'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa"]';

        await page.waitForSelector(selector_share);

        const option_choose = await page.$$(selector_share);

        for (const option of option_choose) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (textContent === "Bagikan") {
            await option.click();
            break;
          }
        }

        let selector_option_share =
          'span[class^="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft"]';

        await page.waitForSelector(selector_option_share);

        const options_share = await page.$$(selector_option_share);

        setTimeout(async () => {
          await screenshoot(page, user_id, "share-posting-fb");

          for (const option of options_share) {
            const textContent = await option.evaluate((element) =>
              element.textContent.trim()
            );

            if (textContent === "Bagikan sekarang (Publik)") {
              await option.click();
              break;
            }
          }

          await browser.close();

          await update_user_account(user_id, null, true);

          resolve("share facebook posting success");
        }, 5000);
      } catch (error) {
        console.log(error);

        await update_user_account(user_id, error.message, false);

        await browser.close();

        reject(error);
      }
    }, 8000);
  });
}

module.exports = helper_share_posting_fb;
