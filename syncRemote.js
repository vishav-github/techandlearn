const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.authenticate({ username: 'singh', password: 'Cra75' });

    await page.goto('https://eu.checker-soft.com/testing/m_update-lang-files.php', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const fileSelector = 'input[type="file"]';
    if (!(await page.$(fileSelector))) throw new Error("File input not found.");
    await page.waitForSelector(fileSelector, { timeout: 10000 });
    await page.$(fileSelector).then(input =>
      input.uploadFile(path.resolve(__dirname, 'uploads/latest.xlsx'))
    );

    const saveSelector = '#saveButton';
    if (!(await page.$(saveSelector))) throw new Error("Save button not found.");
    await page.click(saveSelector);
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 });

    const statusSelector = '#statusMessage';
    if (!(await page.$(statusSelector))) throw new Error("Status message not found.");
    const message = await page.$eval(statusSelector, el => el.textContent.trim());

    console.log("✅ Sync Result:", message);
  } catch (err) {
    console.error("❌ Sync Failed:", err.message);
  } finally {
    await browser.close();
  }
})();
