async function sub_report_ig(page, report_issue, sub_report) {
  if (report_issue === "Ini adalah spam") {
    console.log("masuk c nih");

    await close_report(
      page,
      'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xw7yly9 x1yztbdb x1pi30zi x1swvt13 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]',
      "Tutup"
    );

    return;
  }

  if (
    report_issue === "Ujaran atau simbol kebencian" ||
    report_issue === "Perundungan (bullying) atau pelecehan" ||
    report_issue === "Bunuh diri, melukai diri, atau gangguan makan"
  ) {
    console.log("masuk d nih");

    await page.waitForSelector('button[class="_acan _acap _acas _aj1-"]');

    await page.click('button[class="_acan _acap _acas _aj1-"]');

    return;
  }

  await page.waitForSelector(
    'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xw7yly9 x1yztbdb x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]'
  );

  const element_selector = await page.$(
    'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xw7yly9 x1yztbdb x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]'
  );

  if (report_issue === "Informasi palsu") {
    console.log("masuk a nih");

    await element_selector.waitForSelector(
      'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]'
    );

    const sub_menu_element = await element_selector.$$(
      'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]'
    );

    for (const option of sub_menu_element) {
      const text_content = await option.evaluate((el) => el.textContent.trim());

      if (text_content === sub_report) {
        await option.click();
      }
    }

    await close_report(
      page,
      'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xw7yly9 x1yztbdb x1pi30zi x1swvt13 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]',
      "Tutup"
    );

    return;
  }

  if (
    report_issue === "Kekerasan atau organisasi berbahaya" ||
    report_issue === "Penjualan barang ilegal atau barang dengan izin khusus" ||
    report_issue === "Ketelanjangan atau aktivitas seksual"
  ) {
    console.log("masuk b nih");
    await element_selector.waitForSelector(
      'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xdj266r xat24cr x1pi30zi x1swvt13 x1l90r2v xyamay9 x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1"]'
    );

    const sub_menu_element = await element_selector.$$(
      'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xdj266r xat24cr x1pi30zi x1swvt13 x1l90r2v xyamay9 x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1"]'
    );

    for (const option of sub_menu_element) {
      const text_content = await option.evaluate((el) => el.textContent.trim());

      if (text_content === sub_report) {
        await option.click();
      }
    }

    await close_report(
      page,
      'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1pi30zi x1swvt13 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"]',
      "Kirim laporan"
    );

    return;
  }
}

async function close_report(page, selector, statement) {
  await page.waitForSelector(selector);

  const element_finish = await page.$$(selector);

  for (const option of element_finish) {
    const text_content = await option.evaluate((el) => el.textContent.trim());

    if (text_content === statement) {
      await option.click();
    }
  }
}

module.exports = sub_report_ig;
