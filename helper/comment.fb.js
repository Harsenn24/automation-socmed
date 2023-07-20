const { headless_axios, headless_puppeteer } = require("./headless");
const screenshoot = require("./screenshoot");

async function helper_comment_fb(user_id, post_link, user_comment, headless) {
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

        await page.waitForSelector('div[aria-label="Tulis komentar"]', {
          visible: true,
        });

        await page.type('div[aria-label="Tulis komentar"]', user_comment);

        await page.keyboard.press("Enter");

        console.log(user_id + " success comment facebook");

        await screenshoot(page, user_id, "comment-FB");

        resolve("Facebook comment Success");
        // await browser.close();
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    }, 5000);
  });
}

module.exports = helper_comment_fb;
