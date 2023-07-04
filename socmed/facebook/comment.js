const axios = require("axios");
const global_response = require("../../global_response");
const puppeteer = require("puppeteer");
const url_adspower = process.env.URL_ADSPOWER;

async function comment_fb(req, res) {
  try {
    const { user_id, post_link, user_comment } = req.body;

    if (!user_id) {
      throw { message: "User Id is required" };
    }

    if (!post_link) {
      throw { message: "Post link is required" };
    }

    if (!user_comment) {
      throw { message: "User comment is required" };
    }

    const { data } = await axios.get(`${url_adspower}${user_id}`);

    const puppeteerUrl = data.data.ws.puppeteer;

    const browser = await puppeteer.connect({
      browserWSEndpoint: puppeteerUrl,
      defaultViewport: null,
    });
    const pages = await browser.pages(0);

    const page = pages[0];

    await page.goto(post_link);

    // await page.reload()

    await page.waitForSelector('div[aria-label="Tulis komentar"]');

    await page.type('div[aria-label="Tulis komentar"]', user_comment);

    await page.keyboard.press("Enter");

    res.status(200).json(global_response("SUCCESS", 200, "Facebook Comment Success"));
  } catch (error) {
    res.status(400).json(global_response("ERROR", 400, error));
  }
}

module.exports = comment_fb;
