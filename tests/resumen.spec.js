const { test } = require('@playwright/test');

test('Scrape headline titles on La Republica', async ({ page }) => {
  // 1. Navigate to the URL
  await page.goto('https://larepublica.pe/');

  // 2. Wait for the page to render its dynamic content
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // 3. Use page.evaluate() to run JavaScript directly inside the browser.
  //    This fetches ALL the h2 headline text from that page.
  //    page.evaluate() lets you run any browser-side JavaScript and return the result.
  const headlines = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2'))
      .map(el => el.innerText.trim())
      .filter(text => text.length > 10); // Remove empty or tiny ones
  });

  // 4. Print each headline with its index number
  console.log(`\n========== LA REPUBLICA HEADLINES (${headlines.length} found) ==========`);
  headlines.forEach((title, index) => {
    console.log(`[${index + 1}] ${title}`);
  });
  console.log('=====================================================================\n');

  await page.screenshot({ path: 'larepublica.png' });
});
