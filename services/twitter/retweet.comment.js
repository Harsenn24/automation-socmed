const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function service_retweet_comment_twitter(
  user_id,
  tweet_link,
  user_retweet,
  headless
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

  await page.goto(tweet_link);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const selector_retweet =
          'div[class="r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-1rnoaur r-t60dpp r-1ttztb7"]';

        await page.waitForSelector(selector_retweet, {
          visible: true,
        });

        await page.click(selector_retweet);

        await page.type(selector_retweet, user_retweet);

        await page.keyboard.down("Control");

        await page.keyboard.press("Enter");

        await screenshoot(page, user_id, "retweet-Twitter");

        console.log(`${user_id} : retweet comment successfully posted`);

        resolve(`${user_id} : retweet comment  successfully posted`);

        await browser.close();
      } catch (error) {
        await browser.close();

        console.log(error.message);

        reject(error);
      }
    }, 5000);
  });
}

module.exports = service_retweet_comment_twitter;
