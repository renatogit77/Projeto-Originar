const { defineConfig } = require("cypress");

const ambiente = process.env.ENV || 'tst';

const urls = {
  tst: 'https://originar-tst.amaggi.com.br',
  hmg: 'https://originar-hmg.amaggi.com.br'
};

module.exports = defineConfig({
  e2e: {
    baseUrl: urls[ambiente],

    viewportWidth: 1920,
    viewportHeight: 1080,

    env: {
      ambiente,
      urls
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },
});