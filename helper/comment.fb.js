const axios = require("axios");
const puppeteer = require("puppeteer");
const url_adspower = process.env.URL_ADSPOWER;

async function helper_comment_fb(user_comment, user_id, post_link) {
  try {
    const { data } = await axios.get(`${url_adspower}${user_id}&headless=1`);

    // const { data } = await axios.get(`${url_adspower}${user_id}`);
    const puppeteerUrl = data.data.ws.puppeteer;

    const browser = await puppeteer.connect({
      browserWSEndpoint: puppeteerUrl,
      // defaultViewport: null,
      headless: true,
    });
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
  } catch (error) {
    return error;
  }
}

module.exports = helper_comment_fb;
