const puppeteer = require("puppeteer");
const url_adspower = process.env.URL_ADSPOWER;
const axios = require("axios");

async function helper_like_ig(user_id, post_link) {
  const { data } = await axios.get(`${url_adspower}${user_id}`);

  const puppeteerUrl = data.data.ws.puppeteer;

  const browser = await puppeteer.connect({
    browserWSEndpoint: puppeteerUrl,
    defaultViewport: null,
  });

  const pages = await browser.pages(0);

  const page = pages[0];

  await page.goto(post_link);

  return new Promise((resolve) => {
    setTimeout(async () => {
      var final_result;
      await page.waitForSelector(
        ".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3"
      );

      const ariaLabel = await page.$eval(
        ".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3",
        (element) => element.getAttribute("aria-label")
      );

      if (ariaLabel === "Suka") {
        await page.evaluate(() => {
          const likeButton = document.querySelector(
            'div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn div[aria-label="Suka"]'
          );
          likeButton.click();
        });

        final_result = "Success like facebook";
      } else {
        final_result = "You already like this facebook post";
      }

      console.log(`${user_id} ${final_result}`);

      resolve(final_result);
    }, 8000);
  });

}

module.exports = helper_like_ig;
