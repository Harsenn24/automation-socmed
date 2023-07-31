const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function helper_like_ig(user_id, post_link, headless) {
  const data = await headless_axios(headless, user_id);

  if (data.msg === "Failed to start browser") {
    throw {
      message: `User ${user_id} is having a problem, try a different user id please`,
    };
  }

  const puppeteerUrl = data.data.ws.puppeteer;

  const browser = await headless_puppeteer(headless, puppeteerUrl);

  const pages = await browser.pages(0);

  const page = pages[0];

  await page.goto(`https://www.instagram.com/p/${post_link}`);

  let final_result = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const titleValues = await page.$$eval("title", (elements) => {
          return elements.map((element) => element.textContent.trim());
        });

        const containsBatalSuka = titleValues.includes("Batal Suka");

        if (containsBatalSuka) {
          console.log(`${user_id} : You already Liked this post`);
          resolve("You already like this instagram post");
        } else {
          await page.evaluate(() => {
            const likeButton = document.querySelector(
              'div.x1i10hfl.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x6s0dn4.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.x78zum5.xl56j7k.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha span svg[aria-label="Suka"]'
            );
            likeButton.parentElement.parentElement.parentElement.click();
          });
          console.log(`${user_id} : "You like this post" `);
          resolve("You like this post");
        }

        setTimeout(async () => {
          await screenshoot(page, user_id, "Like-Instagram");
          await browser.close();
        }, 5000);
      } catch (error) {
        await browser.close();
        console.log(`account ${user_id} : ${error}}`);
        reject(error);
      }
    }, 8000);
  });

  return final_result;
}

module.exports = helper_like_ig;
