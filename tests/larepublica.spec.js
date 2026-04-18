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

});
