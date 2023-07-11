const puppeteer = require("puppeteer");
const url_adspower = process.env.URL_ADSPOWER;
const axios = require("axios");

async function helper_like_ig(user_id, post_link) {
  try {
    const { data } = await axios.get(`${url_adspower}${user_id}&headless=1`);

    const puppeteerUrl = data.data.ws.puppeteer;

    const browser = await puppeteer.connect({
      browserWSEndpoint: puppeteerUrl,
      headless: true,
    });

    const pages = await browser.pages(0);

    const page = pages[0];

    await page.goto(`https://www.instagram.com/p/${post_link}`);

    return new Promise((resolve) => {
      setTimeout(async () => {
        let final_result;

        const titleValues = await page.$$eval("title", (elements) => {
          return elements.map((element) => element.textContent.trim());
        });

        const containsBatalSuka = titleValues.includes("Batal Suka");

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

        resolve(final_result);
      }, 8000);
    });
  } catch (error) {
    return error;
  }
}

module.exports = helper_like_ig;