const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://web.okjike.com/login?redirect=/feed');
  await page.waitFor(1000);
  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return document.querySelector('.app-container');
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
})();