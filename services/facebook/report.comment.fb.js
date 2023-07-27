const { headless_axios, headless_puppeteer } = require("../../helper/headless");
const screenshoot = require("../../helper/screenshoot");
const sub_report = require("./sub.report");

async function helper_report_comment_fb(
  user_id,
  post_link,
  headless,
  report_issue,
  sub_report_1,
  comment_link_input
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

  await page.goto(post_link);

  let final_result = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await page.reload();

        const selector_comment =
          'div[class="x1r8uery x1iyjqo2 x6ikm8r x10wlt62 x1pi30zi"]';

        await page.waitForSelector(selector_comment);

        const option_Selector_comment = await page.$$(selector_comment);

        for (const option of option_Selector_comment) {
          const selector_href =
            'a[class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g xt0b8zv"]';

          await option.waitForSelector(selector_href);

          const href = await option.$eval(selector_href, (element) =>
            element.getAttribute("href")
          );

          let id_comment = href.split(/[?&]/)[1];

          if (id_comment === comment_link_input) {
            console.log("match comment link");

            const specificDivSelector =
              "div.x1i10hfl.x1qjc9v5.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.x2lwn1j.xeuugli.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.xjyslct.xjbqb8w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x3nfvp2.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x3ajldb.x194ut8o.x1vzenxt.xd7ygy7.xt298gk.x1xhcax0.x1s928wv.x10pfhc2.x1j6awrg.x1v53gu8.x1tfg27r.xitxdhh";

            await option.waitForSelector(specificDivSelector);

            const specificDiv = await option.$(specificDivSelector);

            await specificDiv.click();
          }
        }

        const selector_options =
          'span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen xk50ysn xzsf02u x1yc453h"]';

        await page.waitForSelector(selector_options);

        const options_choose = await page.$$(selector_options);

        for (const option of options_choose) {
          const textContent = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (textContent.includes("Laporkan komentar")) {
            await option.click();
            break;
          }
        }

        const selector_report_options =
          'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

        await page.waitForSelector(selector_report_options);

        const option_report = await page.$$(selector_report_options);

        for (const option of option_report) {
          const textContent = await option.evaluate((el) =>
            el.textContent.trim()
          );

          if (textContent === report_issue) {
            if (report_issue === "Terorisme") {
              await option.click();
              break;
            }
            await option.click();

            await sub_report(page, sub_report_1);
            break;
          }
        }

        let selector_final =
          'div[class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3"]';

        await page.waitForSelector(selector_final);

        const aria_label = await page.$eval(selector_final, (element) =>
          element.getAttribute("aria-label")
        );

        if (aria_label === "Kirim") {
          await page.evaluate(() => {
            const sendButton = document.querySelector(
              'div[class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3"]'
            );
            sendButton.click();
          });
        } else {
          console.log("You already report with this issue");
        }

        setTimeout(async () => {
          await screenshoot(page, user_id, "report-comment-FB");

          console.log(user_id + " success report facebook comment");

          resolve(
            `success report command with user ${user_id} with issue ${report_issue} and sub issue ${sub_report_1}`
          );

          await browser.close();
        }, 8000);
      } catch (error) {
        await browser.close();
        console.log(`account ${user_id} : ${error}}`);
        reject(error.message);
      }
    }, 10000);
  });

  return final_result;
}

module.exports = helper_report_comment_fb;
