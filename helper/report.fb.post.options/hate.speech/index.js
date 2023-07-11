async function hate_speech(page, sub_report_1) {
  let selector_hate_speech =
    'span[class^="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 xk50ysn xzsf02u x1yc453h"]';

  await page.waitForSelector(selector_hate_speech);

  const option_hate_speech = await page.$$(selector_hate_speech);

  for (const option of option_hate_speech) {
    const textContent = await option.evaluate((el) => el.textContent.trim());

    if (textContent === "Ras atau Etnis" && "Ras atau Etnis" === sub_report_1) {
      await option.click();
      return;
    }

    if (textContent === "Asal Negara" && "Asal Negara" === sub_report_1) {
      await option.click();
      return;
    }

    if (textContent === "Afiliasi Agama" && "Afiliasi Agama" === sub_report_1) {
      await option.click();
      return;
    }

    if (textContent === "Kasta Sosial" && "Kasta Sosial" === sub_report_1) {
      await option.click();
      return;
    }

    if (
      textContent === "Orientasi Seksual" &&
      "Orientasi Seksual" === sub_report_1
    ) {
      await option.click();
      return;
    }

    if (
      textContent === "Jenis Kelamin atau Identitas Gender" &&
      "Jenis Kelamin atau Identitas Gender" === sub_report_1
    ) {
      await option.click();
      return;
    }

    if (
      textContent === "Disabilitas atau Penyakit" &&
      "Disabilitas atau Penyakit" === sub_report_1
    ) {
      await option.click();
      return;
    }

    if (textContent === "Hal Lain" && "Hal Lain" === sub_report_1) {
      await option.click();
      return;
    } else {
      throw { message: "sub report doesn't match with facebook report list" };
    }
  }
}

module.exports = hate_speech;
