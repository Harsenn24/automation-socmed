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

    const { user_id, post_link, user_comment } = req.body;

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
      await page.reload()

      await page.waitForSelector('textarea[aria-label="Tambahkan komentar…"]', {
        visible: true,
      });

      await page.type(
        'textarea[aria-label="Tambahkan komentar…"]',
        user_comment
      );
      await page.keyboard.press("Enter");
      res.status(200).json(global_response("SUCCESS", 200, "Comment Success"));
    }, 5000);
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("ERROR", 400, error));
  }
}

async function type_comment(user_comment, page, isCommentFieldEmpty) {
  console.log(isCommentFieldEmpty);
  if (isCommentFieldEmpty === 0) {
    await page.type('textarea[aria-label="Tambahkan komentar…"]', user_comment);

    let new_type_value = await page.evaluate(() => {
      const commentInput = document.querySelector(
        'textarea[aria-label="Tambahkan komentar…"]'
      );
      return commentInput.value;
    });

    console.log(new_type_value.length, "value terbaru");

    await type_comment(user_comment, page, new_type_value.length);
  } else {
    console.log("ok berhasil ngetik");
    return true;
  }
}

module.exports = comment_ig;
