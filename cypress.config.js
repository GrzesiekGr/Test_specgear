const { defineConfig } = require('cypress');
module.exports = defineConfig({
  projectId: "8sjk9n",
  reporter: "mochawesome",
  reporterOptions:{
    "reportFilename": "[name]report",
    "overwrite": TransformStreamDefaultController,
    "html": true,
    "json": true
  },
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1440,
    baseUrl: 'https://specgear.com.pl/',
    chromeWebSecurity: false,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})