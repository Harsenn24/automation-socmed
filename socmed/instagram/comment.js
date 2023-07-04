const axios = require("axios");
const global_response = require("../../global_response");
const puppeteer = require("puppeteer");
const { validate_body_comment } = require("../../helper/validation");
const url_adspower = process.env.URL_ADSPOWER;

async function comment_ig(req, res) {
  try {
    const check_validate = await validate_body_comment(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { data } = await axios.get(`${url_adspower}${user_id}`);

    const puppeteerUrl = data.data.ws.puppeteer;

    const browser = await puppeteer.connect({
      browserWSEndpoint: puppeteerUrl,
      defaultViewport: null,
    });
    const pages = await browser.pages(0);

    const page = pages[0];

    await page.goto(`https://www.instagram.com/p/${post_link}`);

    setTimeout(async () => {
      await page.waitForSelector('textarea[aria-label="Tambahkan komentar…"]');

      await page.type(
        'textarea[aria-label="Tambahkan komentar…"]',
        user_comment
      );
      await page.keyboard.press("Enter");
    }, 8000);

    res.status(200).json(global_response("SUCCESS", 200, "Comment Success"));
  } catch (error) {
    res.status(400).json(global_response("ERROR", 400, error));
  }
}

module.exports = comment_ig;
