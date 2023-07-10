const update_user_account = require("../controller/update.user");
const { headless_axios, headless_puppeteer } = require("./headless");

async function helper_comment_ig(user_id, post_link, user_comment, headless) {
  const data = await headless_axios(headless, user_id);

  if (data.msg === "Failed to start browser") {
    await update_user_account(user_id, data.msg);
    throw {
      message: `User ${user_id} is having a problem, try a different user id please`,
    };
  }
  const puppeteerUrl = data.data.ws.puppeteer;

  const browser = await headless_puppeteer(headless, puppeteerUrl);

  const pages = await browser.pages(0);

  const page = pages[0];

  return new Promise(async (resolve, reject) => {
    await page.goto(`https://www.instagram.com/p/${post_link}`);
    setTimeout(async () => {
      try {
        await page.reload();

        await page.waitForSelector(
          'textarea[aria-label="Tambahkan komentar…"]',
          {
            visible: true,
          }
        );

        await page.type(
          'textarea[aria-label="Tambahkan komentar…"]',
          user_comment
        );
        await page.keyboard.press("Enter");

        resolve("Instagram Comment Success");
      } catch (error) {
        console.log(`account ${user_id} : ${error}}`);
        reject(error);
      } finally {
        await browser.close();
      }
    }, 5000);
  });
}

module.exports = helper_comment_ig;
