const { test, expect } = require('@playwright/test');
const { LaRepublicaPage } = require('../pages/LaRepublicaPage');

test.describe('La Republica Desktop Tests', () => {
  
  test('Extract, log, and screenshot news headlines from La Republica', async ({ page }) => {
    const laRepublica = new LaRepublicaPage(page);

    // 1. Navigate to the URL
    await laRepublica.goto();

    // 3. Extract headlines
    const headlines = await laRepublica.extractHeadlines();

    // 4. Print results
    console.log(`\n========== LA REPUBLICA HEADLINES (${headlines.length} found) ==========`);
    headlines.forEach((title, index) => {
      console.log(`[${index + 1}] ${title}`);
    });
    console.log('=====================================================================\n');

    await laRepublica.takeScreenshot('larepublica_pom');
  });

  test('Clicking the site logo returns to the homepage', async ({ page }) => {
    const laRepublica = new LaRepublicaPage(page);

    // 1. Navigate to a specific section
    await laRepublica.gotoSection('politica');

    // 2. Click the logo
    await laRepublica.clickLogo();

    // 3. Verify the URL is back to the main homepage
    await expect(page).toHaveURL('https://larepublica.pe/');
    
    console.log('Successfully returned to the homepage via POM.');
  });

  test('Navigate through primary categories and verify URLs', async ({ page }, testInfo) => {
    const laRepublica = new LaRepublicaPage(page);
    await laRepublica.goto();

    const categories = [
      { name: 'LO ÚLTIMO', expectedUrl: '/ultimas-noticias' },
      { name: 'ELECCIONES', expectedUrl: '/elecciones' },
      { name: 'POLÍTICA', expectedUrl: '/politica' },
      { name: 'OPINIÓN', expectedUrl: '/opinion' },
      { name: 'ECONOMÍA', expectedUrl: '/economia' },
    ];

    for (const category of categories) {
      // Return to home before each click to ensure menu is consistent
      await laRepublica.goto();
      
      const menuButton = laRepublica.getMenuCategory(category.name);
      
      // Navigate and verify
      await menuButton.click();
      await expect(page).toHaveURL(new RegExp(category.expectedUrl));

      // Capture and attach screenshot to the HTML report
      const screenshotName = `cat_${category.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '_')}`;
      const screenshot = await page.screenshot();
      await testInfo.attach(screenshotName, { body: screenshot, contentType: 'image/png' });
      
      console.log(`Successfully navigated to: ${category.name}`);
    }
  });

});
