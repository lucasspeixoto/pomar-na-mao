/* eslint-disable @typescript-eslint/no-require-imports */
import { defineConfig } from 'cypress';

const cucumber = require('cypress-cucumber-preprocessor').default;
const browserify = require('@cypress/browserify-preprocessor');
const resolve = require('resolve');

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        ...browserify.defaultOptions,
        typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
      };
      on('file:preprocessor', cucumber(options));
    },
    baseUrl: 'http://localhost:4200',
    specPattern: '**/*.feature',
    excludeSpecPattern: '*.js',
    testIsolation: false,
  },
});
