require('import-export');
const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3000/',
      show: true,
      windowSize: '1920 x 900'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'tests'
}