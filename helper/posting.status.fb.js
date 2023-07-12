const { headless_axios, headless_puppeteer } = require("./headless");

async function helper_posting_status_fb(
  user_id,
  user_status_message,
  headless
) {
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

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const selector_typing =
          'div[class="x1i10hfl x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x16tdsg8 x1hl2dhg xggy1nq x87ps6o x1lku1pv x1a2a7pz x6s0dn4 xmjcpbm x107yiy2 xv8uw2v x1tfwpuw x2g32xy x78zum5 x1q0g3np x1iyjqo2 x1nhvcw1 x1n2onr6 xt7dq6l x1ba4aug x1y1aw1k xn6708d xwib8y2 x1ye3gou"]';

        await page.waitForSelector(selector_typing);

        await page.click(selector_typing);

        let selector_posting_target =
          'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

        await page.waitForTimeout(5000);

        const isSelectorAvailable = await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          return element !== null;
        }, selector_posting_target);

        if (isSelectorAvailable) {
          console.log("Selector is available on the page.");

          await page.waitForSelector(selector_posting_target, {
            timeout: 5000,
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

          const selector_choose_target =
            'div[class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3"]';

          await page.waitForSelector(selector_choose_target);

          await page.click(selector_choose_target);
        } else {
          console.log("Selector is not available on the page.");

          const typing_selector =
            'div[class="xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x9f619 x1lliihq x5yr21d xh8yej3 notranslate"]';

          await page.waitForSelector(typing_selector, {
            visible: true,
          });

          await page.type(typing_selector, user_status_message);

          setTimeout(async () => {
            const send_status_selector = 'div[aria-label="Kirim"]';
            await page.waitForSelector(send_status_selector, {
              visible: true,
            });

            await page.click(send_status_selector);
          }, 5000);
        }

        resolve(`success posting status account ${user_id}`);
      } catch (error) {
        reject(`error account ${user_id} : ${error}`);
      } finally {
        // await browser.close();
        console.log("oke");
      }
    }, 8000);
  });
}

module.exports = helper_posting_status_fb;
