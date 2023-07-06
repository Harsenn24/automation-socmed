const axios = require("axios");
const global_response = require("../../global_response");
const puppeteer = require("puppeteer");
const { validate_body_comment } = require("../../helper/validation");
const url_adspower = process.env.URL_ADSPOWER;

async function comment_fb(req, res) {
  try {
    const check_validate = await validate_body_comment(req);

    if (check_validate) {
      throw { message: check_validate.message };
    }

    const { user_id, post_link, user_comment } = req.body;

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

    setTimeout(async () => {
      await page.reload();

      await page.waitForSelector('div[aria-label="Tulis komentar"]', {
        visible: true,
      });

      await page.type('div[aria-label="Tulis komentar"]', user_comment);

      await page.keyboard.press("Enter");

      res
        .status(200)
        .json(global_response("SUCCESS", 200, "Facebook Comment Success"));
    }, 5000);
  } catch (error) {
    res.status(400).json(global_response("ERROR", 400, error));
  }
}

module.exports = comment_fb;
