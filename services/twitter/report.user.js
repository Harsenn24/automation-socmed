const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");

async function service_report_user_twitter(user_id, account, headless, report) {
  const { main_report, sub_1, sub_2 } = report;

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

  await page.goto(`https://twitter.com/${account}`);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const selector_option =
          'div[aria-label="Lainnya"][data-testid="userActions"]';

        await page.waitForSelector(selector_option);

        await page.click(selector_option);

        const selector_report =
          'span[class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"]';

        await page.waitForSelector(selector_report);

        const elements_report = await page.$$(selector_report);

        for (const option of elements_report) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (textContent === `Laporkan @${account}`) {
            option.click();

            break;
          }
        }

        const start_report_selector =
          'div[data-testid="OCF_CallToAction_Button"]';

        await page.waitForSelector(start_report_selector);

        await page.click(start_report_selector);

        const target_report_selector =
          'label[class="css-1dbjc4n r-1habvwh r-18u37iz r-16y2uox r-1wtj0ep r-16x9es5 r-1ny4l3l r-1l7z4oj r-1dye5f7 r-gy4na3 r-i023vh r-1f1sjgu r-o7ynqc r-6416eg"]';

        await page.waitForSelector(target_report_selector);

        const option_target_report = await page.$$(target_report_selector);

        for (const option of option_target_report) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (
            textContent === "Semua orang di TwitterIni memengaruhi semua orang."
          ) {
            await option.click();
          }
        }

        await page.click('div[data-testid="ChoiceSelectionNextButton"]');

        const main_report =
          'label[class="css-1dbjc4n r-1habvwh r-18u37iz r-16y2uox r-1wtj0ep r-16x9es5 r-1ny4l3l r-1l7z4oj r-1dye5f7 r-gy4na3 r-i023vh r-1f1sjgu r-o7ynqc r-6416eg"]';

        await page.waitForSelector(main_report);

        const option_main_report = await page.$$(main_report);

        for (const option of option_main_report) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (
            textContent ===
            "SpamMemposting tautan berbahaya, menyalahgunakan hashtag, engagement palsu, balasan, Retweet, atau Direct Message yang repetitif."
          ) {
            await option.click();
          }
        }

        await page.click('div[data-testid="ChoiceSelectionNextButton"]');

        const something_else =
          'label[class="css-1dbjc4n r-1habvwh r-18u37iz r-16y2uox r-1wtj0ep r-16x9es5 r-1ny4l3l r-1l7z4oj r-1dye5f7 r-gy4na3 r-i023vh r-1f1sjgu r-o7ynqc r-6416eg"]';

        await page.waitForSelector(something_else);

        const option_something_else = await page.$$(something_else);

        for (const option of option_something_else) {
          const textContent = await option.evaluate((element) =>
            element.textContent.trim()
          );

          if (textContent === "Sesuatu yang lain") {
            await option.click();
          }
        }

        await page.click('div[data-testid="ChoiceSelectionNextButton"]');

        await page.waitForSelector(
          'div[data-testid="ocfSettingsListSkipButton"]'
        );

        await page.click('div[data-testid="ocfSettingsListSkipButton"]');

        const selector_report_list =
          'label[class="css-1dbjc4n r-kemksi r-1kqtdi0 r-1q9bdsx r-d045u9 r-1loqt21 r-18u37iz r-16y2uox r-1wtj0ep"]';

        await page.waitForSelector(selector_report_list);

        const option_report_list = await page.$$(selector_report_list);

        for (const option of option_report_list) {
          const element_text = await option.$(
            'span[class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"]'
          );

          const textContent = await element_text.evaluate((element) =>
            element.textContent.trim()
          );

          if (textContent === "Perilaku menghina") {
            await option.click();
          }
        }

        await page.click('div[data-testid="ChoiceSelectionNextButton"]');

        const selecor_send_report =
          'div[data-testid="ocfSettingsListNextButton"]';

        await page.waitForSelector(selecor_send_report);

        await page.click(selecor_send_report);

        setTimeout(async () => {
          await screenshoot(page, user_id, "report-user-twitter");

          console.log(`${user_id} : report twitter user successfully`);

          resolve(`${user_id} : report twitter user successfully`);

          await browser.close();
        }, 5000);
      } catch (error) {
        await browser.close();

        console.log(error);

        resolve(error);
      }
    }, 8000);
  });
}

module.exports = service_report_user_twitter;
