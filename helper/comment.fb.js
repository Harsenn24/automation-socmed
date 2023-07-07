const axios = require("axios");
const puppeteer = require("puppeteer");
const { headless_axios, headless_puppeteer } = require("./headless");
const url_adspower = process.env.URL_ADSPOWER;

async function helper_comment_fb(user_id, post_link, user_comment, headless) {
  // const { data } = await axios.get(`${url_adspower}${user_id}&headless=1`);

  const data = await headless_axios(headless, user_id);

  if (data.msg === "Failed to start browser") {
    throw {
      message: `User ${user_id} is having a problem, try a different user id please`,
    };
  }
  const puppeteerUrl = data.data.ws.puppeteer;

  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: puppeteerUrl,
  //   headless: true,
  // });

  const browser = await headless_puppeteer(headless, puppeteerUrl);

  const pages = await browser.pages(0);

  const page = pages[0];

  await page.goto(post_link);

  return new Promise((resolve) => {
    setTimeout(async () => {
      await page.reload();

      await page.waitForSelector('div[aria-label="Tulis komentar"]', {
        visible: true,
      });

      await page.type('div[aria-label="Tulis komentar"]', user_comment);

      await page.keyboard.press("Enter");

      resolve("Facebook Comment Success");
    }, 5000);
  });
}

module.exports = helper_comment_fb;
