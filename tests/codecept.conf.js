const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure')
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS)

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins()

/** @type {CodeceptJS.MainConfig} */
exports.config = {
	tests: './*_test.js',
	output: './output',
	helpers: {
		Puppeteer: {
			url: 'https://dev.dam.aesirx.io/',
			show: true,
			windowSize: '1200x900',
		},
	},
	include: {
		I: './steps_file.js',
	},
	name: 'tests',
}
require('import-export')
