# Playwright Setup Guide

This guide covers how to set up Playwright from scratch and how to run your first automated tests.

## 1. Initializing the Project

Playwright requires an initialized Node.js project to handle your dependencies. Start an empty project and install Playwright.

In your terminal or command prompt, run:
```bash
# 1. Initialize a package.json file with default values
npm init -y

# 2. Install Playwright as a development dependency
npm install -D @playwright/test

# 3. Install the default browser binaries (like Chromium) that Playwright needs to operate
npx playwright install chromium --with-deps
```

## 2. Setting Up the Configuration 

By default, Playwright uses Chromium to run tests headlessly (invisibly). To configure its behavior properly, create a file named `playwright.config.js` in the root of your project:

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Folder where tests should be stored
  timeout: 45000,     // Maximum test runtime
  
  use: {
    headless: false,  // Set to true if you don't want browsers visually popping up
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

## 3. Writing Your First Test

Playwright test files are typically placed in the `tests/` directory with names ending in `.spec.js`. 

Here’s an example `tests/resumen.spec.js` that loads a page and takes a screenshot:

```javascript
const { test, expect } = require('@playwright/test');

test('Load La Republica page', async ({ page }) => {
  // 1. Navigate to the URL
  await page.goto('https://larepublica.pe/');

  // 2. Take a screenshot to prove we got there
  await page.screenshot({ path: 'larepublica.png', fullPage: true });

  console.log('Successfully navigated to the La Republica page and took a screenshot!');
});
```

## 4. Running Your Tests

Playwright provides excellent command-line tools to execute tests:

**Standard Run:**
This will execute the test in the terminal and follow your `playwright.config.js` settings:
```bash
npx playwright test tests/resumen.spec.js
```

**UI Mode (Debugging):**
If you want to view a visual debugger, trace the test step-by-step, and explore the DOM visually:
```bash
npx playwright test --ui
```
