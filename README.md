# Playwright Test Automation Setup

Hey! Welcome to the project. I've set up the base for our Playwright automation framework. 
This guide will walk you through getting everything installed on your machine and how to run your first tests so you can start writing your own scripts right away.

## 1. Getting Started (Installation)

Before you can run anything, you need to pull down the project dependencies. Make sure you have Node.js installed, then run this in your terminal:

```bash
# 1. Install all the required packages (Playwright) that are listed in package.json
npm install

# 2. Download the browser binaries (like Chromium) that Playwright needs to actually open web pages
npx playwright install chromium --with-deps
```

*(Note: If you ever need to set up a brand new project from scratch down the line, the commands I used to initialize this were `npm init -y` followed by `npm install -D @playwright/test`.)*

## 2. How Everything is Configured

Take a look at the `playwright.config.js` file I created in the root folder. This is the brain of our setup.

By default, I've set it up to run tests **headlessly** (invisibly in the background) to make test execution faster, but you can easily change `headless: false` in the config if you want to visually watch the browser pop up during your runs. 

I've also configured it to:
- Look for all our test scripts in the `./tests` directory.
- Use **Chromium** as the default testing browser.
- Automatically take a screenshot and retain a trace video *only if a test fails* (this saves disk space!).

## 3. Our Test Scripts

I've structured the project so all test scripts live in the `tests/` folder and end in `.spec.js`. 

Right now, you can check out `larepublica.spec.js` as an example. It navigates to La Republica, waits for the DOM to load, and extracts the top headlines from the `h2` and `h3` tags by running Javascript directly in the browser context via `page.evaluate()`. 

When you write a new test, feel free to use that script as a template to see how to import `test` and `expect`.

## 4. Running the Tests

Here is how you can execute the code from your terminal:

**Run all tests normally:**
```bash
npx playwright test
```

**Run a specific file:**
```bash
npx playwright test tests/larepublica.spec.js
```

**The UI Debugger (Highly Recommended!):**
If a test is failing or you are actively writing a new test, use the UI mode. It opens a visual debugger that lets you step through the code line-by-line, inspect the DOM, and see exactly what Playwright sees in real-time. It's a lifesaver.
```bash
npx playwright test --ui
```

## 5. Viewing Test Reports

We use the Playwright HTML Reporter to visualize test results. Every time you run the tests, a report is generated in the `playwright-report/` folder.

**To open the latest report:**
```bash
npx playwright show-report
```

If you have any questions or run into issues getting this set up on your machine, just let me know and we can pair on it!
