const update_user_account = require("../../controller/update.user");
const sub_report = require("../../services/facebook/sub.report");
const { headless_axios, headless_puppeteer } = require("../headless");
const screenshoot = require("../screenshoot");

async function helper_report_user_fb(
  user_id,
  profile_link,
  headless,
  report_issue,
  sub_report_data
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

  await page.goto(profile_link);

  let final_result = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        let selector_option =
          'div[aria-label="Lihat Opsi"][class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3"]';

        await page.waitForSelector(selector_option);

        const option_user = await page.$(selector_option);

        await option_user.click();

        const selector_report =
          'span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen xk50ysn xzsf02u x1yc453h"]';

        await page.waitForSelector(selector_report);

        const options_to_report = await page.$$(selector_report);

        for (const option of options_to_report) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (textContent === "Cari dukungan atau laporkan") {
            await option.click();
            break;
          }
        }

        const selector_list_report =
          'span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

        await page.waitForSelector(selector_list_report);

        const option_list_report = await page.$$(selector_list_report);

        for (const option of option_list_report) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (textContent === report_issue) {
            if (
              report_issue !== "Berpura pura Menjadi Orang lain" ||
              report_issue !== "Saya Ingin Membantu"
            ) {
              await option.click();
              break;
            }
            await option.click();

            await sub_report(page, sub_report_data);

            break;
          }
        }

        let selector_finish =
          'span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft"]';

        await page.waitForSelector(selector_finish);

        const option_finish_send = await page.$$(selector_finish);

        setTimeout(async () => {
          await screenshoot(page, user_id, "report-user-FB");

          for (const option of option_finish_send) {
            const textContent = await option.evaluate((element) =>
              element.textContent.trim()
            );

            if (textContent === "Selesai" || textContent === "Kirim") {
              await option.click();

              break;
            }
          }

          console.log(user_id + " success report facebook user");

          await update_user_account(user_id, null, true);

          resolve(
            `success report facebook user with user ${user_id} with issue ${report_issue} and sub issue ${sub_report_data}`
          );

          await browser.close();
        }, 8000);
      } catch (error) {
        console.log(`account ${user_id} : ${error}}`);
        await update_user_account(user_id, error.message, false);
        reject(error);
      }
    }, 5000);
  });

  return final_result;
}

module.exports = helper_report_user_fb;
