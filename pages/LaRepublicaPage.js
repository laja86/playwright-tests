const { expect } = require('@playwright/test');

class LaRepublicaPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://larepublica.pe/';
    
    // Locators
    this.logo = page.locator('header a[href="/"]').first();
    this.headlineElements = page.locator('h2');
  }

  /**
   * Returns a locator for a main menu category based on its visible text.
   * @param {string} categoryName 
   */
  getMenuCategory(categoryName) {
    return this.page.locator('header a').filter({ hasText: categoryName }).first();
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async gotoSection(sectionPath) {
    await this.page.goto(`${this.url}${sectionPath}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async extractHeadlines() {
    // Wait a bit for dynamic content
    await this.page.waitForTimeout(3000);
    
    return await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll('h2'))
        .map(el => el.innerText.trim())
        .filter(text => text.length > 10);
    });
  }

  async clickLogo() {
    await this.logo.click();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `${name}.png` });
  }
}

module.exports = { LaRepublicaPage };
