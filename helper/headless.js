const url_adspower = process.env.URL_ADSPOWER;
const axios = require("axios");
const puppeteer = require("puppeteer");

async function headless_axios(headless, user_id) {
  if (headless === "true") {
    const { data } = await axios.get(`${url_adspower}${user_id}&headless=1`);
    return data;
  } else {
    const { data } = await axios.get(`${url_adspower}${user_id}`);
    return data;
  }
}

async function headless_puppeteer(headless, puppeteerUrl) {
  if (headless === "true") {
    const browser = await puppeteer.connect({
      browserWSEndpoint: puppeteerUrl,
      headless: true,
    });

    return browser;
  } else {
    const browser = await puppeteer.connect({
      browserWSEndpoint: puppeteerUrl,
      defaultViewport: false,
    });

    return browser;
  }
}

module.exports = { headless_axios, headless_puppeteer };
