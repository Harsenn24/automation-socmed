const update_user_account = require("../controller/update.user");
const { headless_axios, headless_puppeteer } = require("./headless");

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

  await page.goto(profile_link);

  let final_result = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const followSelector = 'div[data-testid="1400353926474395648-follow"]';

        const unfollowSelector =
          'div[data-testid="1400353926474395648-unfollow"]';

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

        console.log("Success follow!")

        await update_user_account(user_id, null, true)

        resolve(result_follow);
      } catch (error) {
        console.log(`account ${user_id} : ${error}}`);
        reject(error);
      } 
    }, 5000);
  });

  return final_result;
}

module.exports = helper_follow_twitter;
