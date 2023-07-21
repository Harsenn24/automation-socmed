const update_user_activity = require("../../controller/activity");
const { headless_axios, headless_puppeteer } = require("../headless");
const screenshoot = require("../screenshoot");

async function helper_comment_fb(
  user_id,
  post_link,
  user_comment,
  headless,
  status_worker,
  activity
) {
  const data = await headless_axios(headless, user_id);

  if (data.msg === "Failed to start browser") {
    throw {
      message: `User ${user_id} is having a problem, try a different user id please`,
    };
  }
  const puppeteerUrl = data.data.ws.puppeteer;

  if (!puppeteerUrl) {
    throw {
      message:
        "puppeteer url is having problem, try again in minutes or restart adspower",
    };
  }

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

        if (!status_worker) {
          await update_user_activity(user_id, activity, true, null);
        }

        resolve("Facebook comment Success");

        // await browser.close();
      } catch (error) {
        if (!status_worker) {
          await update_user_activity(user_id, activity, false, error.message);
        }

        // await browser.close();

        reject(error.message);
      }
    }, 5000);
  });
}

module.exports = helper_comment_fb;
