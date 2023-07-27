const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function service_retweet(user_id, tweet_link, headless) {
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

  await page.goto(tweet_link);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const selector_action = 'div[class="css-1dbjc4n r-18u37iz r-1h0z5md"]';

        await page.waitForSelector(selector_action);

        const option_action = await page.$$(selector_action);

        let final_Result;

        for (const option of option_action) {
          const selector_retweet =
            'div[class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr"]';

          await option.waitForSelector(selector_retweet);

          const aria_label = await option.$eval(selector_retweet, (element) =>
            element.getAttribute("aria-label")
          );

          if (aria_label === "Retweet") {
            await option.click();
            final_Result = true;
            break;
          } else if (aria_label === "Di-Retweet") {
            final_Result = false;
            break;
          }
        }

        if (!final_Result) {
          console.log(`${user_id} : already retweet`);

          resolve(`${user_id} : already retweet`);

          return;
        }

        const selector_option_retweet = 'div[data-testid="retweetConfirm"]';

        await page.waitForSelector(selector_option_retweet);

        await page.click(selector_option_retweet);

        await screenshoot(page, user_id, "Retweet");

        console.log(`${user_id} : retweet successfully`);

        resolve(`${user_id} : retweet successfully`);

        await browser.close();
      } catch (error) {
        await browser.close();

        console.log(error.message);

        reject(error);
      }
    }, 8000);
  });
}

module.exports = service_retweet;
