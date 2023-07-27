const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");
const path = require("path");

async function service_status_twitter(
  user_id,
  user_tweet,
  headless,
  image_video,
  emoji
) {
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

  await page.goto("https://twitter.com/home");

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const selector_status_column =
          'div[class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"]';

        await page.waitForSelector(selector_status_column, {
          visible: true,
        });

        await page.click(selector_status_column);

        await page.type(selector_status_column, user_tweet);

        if (image_video !== "") {
          let selector_upload =
            'input[class="r-8akbif r-orgf3d r-1udh08x r-u8s1d r-xjis5s r-1wyyakw"][accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"][type="file"]';

          await page.waitForSelector(selector_upload);

          const input_file = await page.$(selector_upload);

          const path_upload = path.join(
            __dirname,
            `../../upload/${image_video}`
          );

          await input_file.uploadFile(path_upload);

          console.log(`upload video / image done : ${user_id}`);
        }

        setTimeout(async () => {
          await page.keyboard.down("Control");

          await page.keyboard.press("Enter");

          await screenshoot(page, user_id, "posting-status-twitter");

          console.log(`${user_id} : tweet successfully posted`);

          resolve(`${user_id} : tweet successfully posted`);

          await browser.close();
        }, 5000);
      } catch (error) {
        await browser.close();

        console.log(`error account ${user_id} : ${error}`);

        reject(`error account ${user_id} : ${error}`);
      }
    }, 8000);
  });
}

module.exports = service_status_twitter;
