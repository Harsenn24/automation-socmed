const { headless_axios, headless_puppeteer } = require("../headless");
const screenshoot = require("../screenshoot");
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

        let selector_comment =
          ".x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv";

        await page.waitForSelector(selector_comment);

        const elements = await page.$$(selector_comment);

        for (const element of elements) {
          const hrefValue = await element.evaluate((node) =>
            node.getAttribute("href")
          );

          console.log(hrefValue, "href value");

          console.log(comment_link_input, "comment link input");

          if (hrefValue === comment_link_input) {
            console.log(true);
            let selector_three_spot = 'div[class="x1hy63sm xg01cxk xhva3ql"]';

            // let selector_three_spot =
            //   'div[aria-label="Sembunyikan atau laporkan ini"][aria-haspopup="menu"]';

            await page.waitForSelector(selector_three_spot);

            await page.click(selector_three_spot);

            let selector_options =
              'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen xk50ysn xzsf02u x1yc453h"]';

            await page.waitForSelector(selector_options);

            const options_choose = await page.$$(selector_options);

            for (const option of options_choose) {
              const textContent = await option.evaluate((el) =>
                el.textContent.trim()
              );
              if (textContent === "Laporkan komentar") {
                await option.click();
                break;
              }
            }

            let selector_report_options =
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
            let selector_send = 'div[aria-label="Kirim"]';

            await page.waitForSelector(selector_send);

            await page.click(selector_send);

            await screenshoot(page, user_id, "report-comment-FB");

            console.log(user_id + " success report facebook comment");

            resolve(
              `success report command with user ${user_id} with issue ${report_issue} and sub issue ${sub_report_1}`
            );
          }
        }
      } catch (error) {
        console.log(`account ${user_id} : ${error}}`);
        reject(error);
      } finally {
        // await browser.close();
        console.log("ok");
      }
    }, 5000);
  });

  return final_result;
}

module.exports = helper_report_comment_fb;
