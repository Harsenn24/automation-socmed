const update_user_account = require("../controller/update.user");
const { headless_axios, headless_puppeteer } = require("./headless");
const path = require("path");
const screenshoot = require("./screenshoot");

async function helper_posting_status_fb(
  user_id,
  user_status_message,
  headless,
  image_video,
  feeling_activity
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

          const typing_selector =
            'div[class="xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x9f619 x1lliihq x5yr21d xh8yej3 notranslate"]';

          await page.waitForSelector(typing_selector, {
            visible: true,
          });

          await page.type(typing_selector, user_status_message);

          console.log(`typing status done: ${user_id} `);

          if (image_video !== "") {
            await page.click('div[aria-label="Foto/video"]');


            let selector_2 =
              'input[class="x1s85apg"][accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv"][type="file"]';

            await page.waitForSelector(selector_2);

            const input_file = await page.$(selector_2);

            const path_upload = path.join(
              __dirname,
              `../upload/${image_video}`
            );

            await input_file.uploadFile(path_upload);

            console.log(`upload video / image done : ${user_id}`);
          }

          if (feeling_activity !== "") {
            await page.click('div[aria-label="Perasaan/aktivitas"]');

            let selector_feeling_activity =
              'div[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x78zum5 x1a2a7pz xh8yej3"]';

            await page.waitForSelector(selector_feeling_activity, {
              visible: true,
            });

            const elements = await page.$$(selector_feeling_activity);

            for (const element of elements) {
              const label = await page.evaluate(
                (el) => el.getAttribute("aria-label"),
                element
              );
              if (label.includes(feeling_activity)) {
                await element.click();
                console.log(`posting feeling activity done: ${user_id} `);
                break;
              }
            }
          }

          setTimeout(async () => {
            const send_status_selector = 'div[aria-label="Kirim"]';
            await page.waitForSelector(send_status_selector, {
              visible: true,
            });

            await page.click(send_status_selector);

            await update_user_account(user_id, null, true);

            console.log(`success posting status account ${user_id}`);

            await screenshoot(page, user_id, "posting-status-FB");

            resolve(`success posting status account ${user_id}`);

            await browser.close();
          }, 5000);
        }, 5000);
      } catch (error) {
        await update_user_account(user_id, error.message, false);
        reject(`error account ${user_id} : ${error}`);
      }
    }, 8000);
  });
}

module.exports = helper_posting_status_fb;
