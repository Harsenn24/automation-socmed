const global_response = require("../global_response");
const { headless_axios, headless_puppeteer } = require("../helper/headless");

async function fb_activity_feeling(req, res) {
  try {
    const { user_id } = req.body;

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

    await page.goto("https://www.facebook.com/");

    let final_result = await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await page.reload();

          const selector_typing =
            'div[class="x1i10hfl x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x16tdsg8 x1hl2dhg xggy1nq x87ps6o x1lku1pv x1a2a7pz x6s0dn4 xmjcpbm x107yiy2 xv8uw2v x1tfwpuw x2g32xy x78zum5 x1q0g3np x1iyjqo2 x1nhvcw1 x1n2onr6 xt7dq6l x1ba4aug x1y1aw1k xn6708d xwib8y2 x1ye3gou"]';

          await page.waitForSelector(selector_typing, {
            visible: true,
            timeout: 5000,
          });

          await page.click(selector_typing);

          setTimeout(async () => {
            let words = [];

            let title_option =
              'span[class^="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1120s5i"]';

            await page.waitForSelector(title_option);

            const options_choose = await page.$$(title_option);

            for (const option of options_choose) {
              const textContent = await option.evaluate((el) =>
                el.textContent.trim()
              );

              words.push(textContent);
            }

            if (
              words.includes("Pemirsa default") &&
              words.includes("Buat postingan")
            ) {
              const selector_posting_target =
                'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

              await page.waitForSelector(selector_posting_target, {
                visible: true,
              });

              const options_choose = await page.$$(selector_posting_target);

              for (const option of options_choose) {
                const textContent = await option.evaluate((el) =>
                  el.textContent.trim()
                );

                if (textContent === "Publik") {
                  await option.click();
                  break;
                }
              }

              setTimeout(async () => {
                const send_status_selector = 'div[aria-label="Selesai"]';
                await page.waitForSelector(send_status_selector, {
                  visible: true,
                });

                await page.click(send_status_selector);
              }, 5000);
            }

            await page.click('div[aria-label="Perasaan/aktivitas"]');

            let selector_feeling_activity =
              'div[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x78zum5 x1a2a7pz xh8yej3"]';

            await page.waitForSelector(selector_feeling_activity, {
              visible: true,
            });

            const elements = await page.$$(selector_feeling_activity);

            const result = [];

            for (let i = 0; i < elements.length; i++) {
              let obj = {};
              const label = await page.evaluate(
                (el) => el.getAttribute("aria-label"),
                elements[i]
              );

              obj.feeling_activity = label;
              obj.number = i + 1;

              result.push(obj);
            }

            resolve(result);
          }, 5000);
        } catch (error) {
          console.log(error);
          throw { message: error.message };
        }
      });
    });

    res.send(final_result);
  } catch (error) {
    console.log(error);
    res.status(400).json(global_response("Failed", 400, error.message));
  }
}

module.exports = fb_activity_feeling;
