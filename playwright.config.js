const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Look for test files in the "tests" directory
  testDir: './tests',

  // Use the HTML reporter
  reporter: 'html',

  // Maximum time one test can run for
  timeout: 45000,

  // Configuration for all the browsers
  use: {
    headless: true,

    // Capture screenshot on failure or all the time?
    screenshot: 'only-on-failure',

    // Record a video of the test run?
    video: 'retain-on-failure',
  },

  // Configure which browsers you want to run your tests on
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // Uses Chromium (Chrome)
    },
    // You can uncomment these if you ever want to test on Firefox or Safari:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
