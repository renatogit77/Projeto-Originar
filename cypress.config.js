const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    setupNodeEvents(on, config) {

      const ambiente = config.env.ambiente || 'tst';

      const urls = {
        tst: 'https://originar-tst.amaggi.com.br',
        hmg: 'https://originar-hmg.amaggi.com.br'
      };

      config.baseUrl = urls[ambiente];

      config.env.ambiente = ambiente;
      config.env.urls = urls;

      return config;
    },

    viewportWidth: 1920,
    viewportHeight: 1080,

  },
});