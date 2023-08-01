const path = require("path");
const screenshoot = require("../../helper/screenshoot");
const { headless_axios, headless_puppeteer } = require("../../helper/headless");

async function service_posting_feed_ig(
  user_id,
  caption,
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

  await page.goto("https://www.instagram.com/");

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        await page.waitForSelector('svg[aria-label="Postingan Baru"]');

        await page.click('svg[aria-label="Postingan Baru"]');

        const selector_upload =
          'input[class="_ac69"][accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime"][type="file"]';

        await page.waitForSelector(selector_upload);

        const input_file = await page.$(selector_upload);

        const path_upload = path.join(__dirname, `../../upload/${image_video}`);

        await input_file.uploadFile(path_upload);

        await next_menu(page);

        const selector_filter =
          'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xw7yly9 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]';

        await page.waitForSelector(selector_filter);

        const element_filter = await page.$$(selector_filter);

        const total_filter = element_filter.length - 1;

        const randomNumber = Math.floor(Math.random() * total_filter); // Generates a random number between 0 and 11

        await element_filter[randomNumber].click();

        await next_menu(page);

        let selector_caption = 'div[aria-label="Tulis keterangan..."]';

        await page.waitForSelector(selector_caption);

        await page.type(selector_caption, caption);

        const selector_share =
          'div[class="x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x1i0vuye x1f6kntn xwhw2v2 xl56j7k x17ydfre x2b8uid xlyipyv x87ps6o x14atkfc xcdnw81 xjbqb8w xm3z3ea x1x8b98j x131883w x16mih1h x972fbf xcfux6l x1qhh985 xm0m39n xt0psk2 xt7dq6l xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x1n5bzlp x173jzuc x1yc6y37"]';

        await page.waitForSelector(selector_share);

        const element_share = await page.$$(selector_share);

        for (const option of element_share) {
          const textContent = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (textContent === "Bagikan") {
            await option.click();
            await screenshoot(page, user_id, "Posting-Feed-Instagram");
          }
        }

        await browser.close();
      } catch (error) {
        await browser.close();

        console.log(`error account ${user_id} : ${error}`);

        reject(`error account ${user_id} : ${error}`);
      }
    }, 8000);
  });
}

async function next_menu(page) {
  const selector_next =
    'div[class="x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x1i0vuye x1f6kntn xwhw2v2 xl56j7k x17ydfre x2b8uid xlyipyv x87ps6o x14atkfc xcdnw81 xjbqb8w xm3z3ea x1x8b98j x131883w x16mih1h x972fbf xcfux6l x1qhh985 xm0m39n xt0psk2 xt7dq6l xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x1n5bzlp x173jzuc x1yc6y37"]';

  await page.waitForSelector(selector_next);

  const element_next = await page.$(selector_next);

  await element_next.click();
}

module.exports = service_posting_feed_ig;
