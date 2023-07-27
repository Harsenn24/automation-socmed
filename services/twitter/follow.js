const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function helper_follow_twitter(user_id, profile_link, headless) {
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

  await page.goto(`https://twitter.com/${profile_link}`);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const followSelector = `div[aria-label="Ikuti @${profile_link}"]`;

        const unfollowSelector = `div[aria-label="Mengikuti @${profile_link}"]`;

        await Promise.race([
          page.waitForSelector(followSelector, { timeout: 5000 }),
          page.waitForSelector(unfollowSelector, { timeout: 5000 }),
        ]);

        const followElement = await page.$(followSelector);

        let result_follow;

        if (followElement !== null) {
          await followElement.click();
          result_follow = "Success follow twitter account";
        } else {
          result_follow = "You already follow this instagram account";
        }

        await screenshoot(page, user_id, "Follow-Twitter");

        console.log(result_follow);

        resolve(result_follow);

        await browser.close();
      } catch (error) {
        await browser.close();

        console.log(`account ${user_id} : ${error}}`);

        reject(error);
      }
    }, 5000);
  });
}

module.exports = helper_follow_twitter;
