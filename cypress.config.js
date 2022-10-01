const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  viewportwidth: 1400,
  viewportHeight: 1000,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 90000,
  requestTimeout: 60000,
  chromeWebSecurity: false,  
  env: {
    TAXJAR_API_KEY: 'b2a4306716a2d9f1aec37d31bb779a2f'
  },
  e2e: {
    experimentalWebKitSupport: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://staging-marketing-4.vshred.com/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    numTestsKeptInMemory: 0,    
  },
});
