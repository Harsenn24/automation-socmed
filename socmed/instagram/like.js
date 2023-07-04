const global_response = require("../../global_response");
const puppeteer = require("puppeteer");
const url_adspower = process.env.URL_ADSPOWER;
const axios = require("axios");

async function like_ig(req, res) {
  try {
    const { user_id, post_link } = req.body;

    if (!user_id) {
      throw { message: "User Id is required" };
    }

    if (!post_link) {
      throw { message: "Post link is required" };
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
      let final_result;

      const titleValues = await page.$$eval("title", (elements) => {
        return elements.map((element) => element.textContent.trim());
      });

      const containsBatalSuka = titleValues.includes("Batal Suka");

      console.log(containsBatalSuka);

      if (containsBatalSuka) {
        final_result = "You already like this instagram post";
      } else {
        await page.evaluate(() => {
          const likeButton = document.querySelector(
            'div.x1i10hfl.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x6s0dn4.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.x78zum5.xl56j7k.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha span svg[aria-label="Suka"]'
          );
          likeButton.parentElement.parentElement.parentElement.click();
        });
        final_result = "You like this post";
      }
      res.status(200).json(global_response("SUCCESS", 200, final_result));
    }, 8000);

  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("FAILED", 400, error));

  }
}

module.exports = like_ig;
