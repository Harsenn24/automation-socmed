const global_response = require("../global_response");
const { headless_axios, headless_puppeteer } = require("../helper/headless");

async function list_comment_fb(req, res) {
  try {
    const { user_id, post_link } = req.body;

    const { headless } = req.query;

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

    await page.goto(post_link);

    let final_result = await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await page.reload();

          let selector_comment =
            ".x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv";

          await page.waitForSelector(selector_comment);

          const elements_comment_link = await page.$$(selector_comment);

          const element_names = await page.$$(
            'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x676frb x1nxh6w3 x1sibtaa x1s688f xzsf02u"]'
          );

          const result_list_comment = [];

          for (const element of elements_comment_link) {
            const hrefValue = await element.evaluate((node) =>
              node.getAttribute("href")
            );

            if (hrefValue.startsWith("https")) {
              const comment_name = await element_names[
                result_list_comment.length
              ].evaluate((el) => el.textContent.trim());

              result_list_comment.push({
                comment_link: hrefValue,
                comment_name: comment_name,
              });
            }
          }

          resolve(result_list_comment);
        } catch (error) {
          console.log(`account ${user_id} : ${error}}`);
          reject(error);
        } finally {
          // await browser.close();
          console.log("ok");
        }
      }, 5000);
    });

    res.status(200).json(global_response("Failed", 200, final_result));
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = list_comment_fb;
