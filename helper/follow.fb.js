const axios = require("axios");
const puppeteer = require("puppeteer");
const { headless_axios, headless_puppeteer } = require("./headless");
const url_adspower = process.env.URL_ADSPOWER;

async function helper_follow_fb(user_id, profile_link, headless) {
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

  await page.goto(profile_link);

  let final_result = await new Promise((resolve) => {
    setTimeout(async () => {
      await page.reload();

      await page.waitForSelector(
        ".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft"
      );

      const result_follow = await page.$$eval(
        ".x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft",
        (elements) => {
          for (const element of elements) {
            if (element.textContent === "Ikuti") {
              element.click();
              return "Success follow facebook account";
            } else if (element.textContent === "Mengikuti") {
              return "You already followed this facebook account";
            }
          }
        }
      );

      resolve(result_follow);
    }, 5000);
  });

  return final_result;
}

module.exports = helper_follow_fb;
