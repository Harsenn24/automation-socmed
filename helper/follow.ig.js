const axios = require("axios");
const puppeteer = require("puppeteer");
const url_adspower = process.env.URL_ADSPOWER;

async function helper_follow_ig(user_id, profile_link) {
    const { data } = await axios.get(`${url_adspower}${user_id}&headless=1`);

  if (data.msg === "Failed to start browser") {
    throw {
      message: `User ${user_id} is having a problem, try a different user id please`,
    };
  }

  const puppeteerUrl = data.data.ws.puppeteer;

  const browser = await puppeteer.connect({
    browserWSEndpoint: puppeteerUrl,
    headless: true,
  });

  const pages = await browser.pages(0);

  const page = pages[0];

  await page.goto(profile_link);

  let final_result = await new Promise((resolve) => {
    setTimeout(async () => {
      await page.reload();

      await page.waitForSelector("._aacl._aaco._aacw._aad6._aade");

      const result_follow = await page.$$eval(
        "._aacl._aaco._aacw._aad6._aade",
        (elements) => {
          for (const element of elements) {
            if (element.textContent === "Ikuti") {
              element.click();
              return "Success follow instagram account";
            } else if (element.textContent === "Diikuti") {
              return "You already follow this instagram account";
            }
          }
        }
      );

      resolve(result_follow);
    }, 5000);
  });

  return final_result;
}

module.exports = helper_follow_ig;
