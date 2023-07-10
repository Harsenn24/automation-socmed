const update_user_account = require("../controller/update.user");
const { headless_axios, headless_puppeteer } = require("./headless");

async function helper_follow_ig(user_id, profile_link, headless) {
  const data = await headless_axios(headless, user_id);

  if (data.msg === "Failed to start browser") {
    await update_user_account(user_id, data.msg);

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

        await page.waitForSelector("._aacl._aaco._aacw._aad6._aade");

        const result_follow = await page.$$eval(
          "._aacl._aaco._aacw._aad6._aade",
          (elements) => {
            for (const element of elements) {
              if (element.textContent === "Ikuti") {
                element.click();
                return "Success follow instagram account";
              } else if (element.textContent === "Diikuti") {
                return "You already follow this instagram account";
              }
            }
          }
        );

        resolve(result_follow);
      } catch (error) {
        console.log(`account ${user_id} : ${error}}`);
        reject(error);
      } finally {
        await browser.close();
      }
    }, 5000);
  });

  return final_result;
}

module.exports = helper_follow_ig;
