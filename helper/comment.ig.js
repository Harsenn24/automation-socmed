const axios = require("axios");
const puppeteer = require("puppeteer");
const { headless_axios, headless_puppeteer } = require("./headless");
const url_adspower = process.env.URL_ADSPOWER;

async function helper_comment_ig(user_id, post_link, user_comment, headless) {
  // const { data } = await axios.get(`${url_adspower}${user_id}&headless=1`);

  const data = await headless_axios(headless, user_id)


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

  const browser = await headless_puppeteer(headless, puppeteerUrl)

  const pages = await browser.pages(0);

  const page = pages[0];

  await page.goto(`https://www.instagram.com/p/${post_link}`);

  return new Promise((resolve, reject) => {
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
        reject(error);
        // throw { message: error };
      }
    }, 5000);
  });
}

module.exports = helper_comment_ig;
