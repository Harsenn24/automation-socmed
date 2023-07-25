const { headless_puppeteer, headless_axios } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function service_like_twitter(user_id, tweet_link, headless) {
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

        const selector_like =
          'div[class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr"]';

        await page.waitForSelector(selector_like);

        const option_aria_label = await page.$$(selector_like);

        let final_Result;

        for (const option of option_aria_label) {
          const aria_label = await page.evaluate(
            (element) => element.getAttribute("aria-label"),
            option
          );

          //   console.log(aria_label, "===> isi aria label");

          if (aria_label === "Suka") {
            await option.click();
            final_Result = `${user_id} : like tweet successfully`;
          } else {
            final_Result = `${user_id} : already liked tweet`;
          }
        }

        console.log(final_Result);

        await screenshoot(page, user_id, "Like-Twitter");

        resolve(`${user_id} : like tweet successfully`);

        await browser.close();
      } catch (error) {
        await browser.close();

        console.log(error.message);

        reject(error);
      }
    }, 8000);
  });
}

module.exports = service_like_twitter;
