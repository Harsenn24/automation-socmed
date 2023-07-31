const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function helper_comment_ig(user_id, post_link, user_comment, headless) {
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
  
  await page.goto(`https://www.instagram.com/p/${post_link}`);

  return new Promise(async (resolve, reject) => {
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

        console.log(`${user_id} : success comment instagram`);

        setTimeout(async () => {
          await screenshoot(page, user_id, "comment-instagram");

          await browser.close();

          resolve("Instagram Comment Success");
        }, 5000);
      } catch (error) {
        console.log(`${user_id} : ${error}}`);

        await browser.close();

        reject(error);
      }
    }, 5000);
  });
}

module.exports = helper_comment_ig;
