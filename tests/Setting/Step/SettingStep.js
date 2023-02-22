import SettingPage from '../Page/SettingPage'

const { I } = inject()

class SettingStep {
	constructor() {
		this.page = new SettingPage()
	}

	settingStorageDefault() {
		I.amOnPage(this.page.locators.urlSetting)
		I.waitForText(this.page.locators.configurationStorageText, 30)
		I.waitForText(this.page.locators.storageLabel, 30)
		I.waitForElement(this.page.locators.storageSelect, 30)
		I.click(this.page.locators.storageSelect)
		I.wait(1)
		I.waitForVisible(this.page.locators.storageInput)
		I.fillField(this.page.locators.storageInput, 'AesirX')
		I.pressKey('Enter')
		I.waitForVisible(this.page.locators.saveSettingButton)
		I.click(this.page.locators.saveSettingButton)
		I.waitForText(this.page.locators.saveSuccessMessage, 30)
	}

	settingStorageAWS(storeAWS) {
		I.amOnPage(this.page.locators.urlSetting)
		I.waitForText(this.page.locators.configurationStorageText, 30)
		I.waitForText(this.page.locators.storageLabel, 30)
		I.wait(1)
		I.waitForElement(this.page.locators.storageSelect, 30)
		I.click(this.page.locators.storageSelect)
		I.wait(1)
		I.waitForVisible(this.page.locators.storageInput)
		I.fillField(this.page.locators.storageInput, storeAWS.name)
		I.pressKey('Enter')
		I.waitForElement(this.page.locators.clientIdInput, 30)
		I.fillField(this.page.locators.clientIdInput, storeAWS.key)
		I.waitForElement(this.page.locators.clientIdInput, 30)
		I.fillField(this.page.locators.secretInput, storeAWS.secret)
		I.waitForElement(this.page.locators.regionInput, 30)
		I.fillField(this.page.locators.regionInput, storeAWS.region)
		I.waitForElement(this.page.locators.bucketInput, 30)
		I.fillField(this.page.locators.bucketInput, storeAWS.bucket)
		I.waitForVisible(this.page.locators.saveSettingButton)
		I.click(this.page.locators.saveSettingButton)
		I.waitForText(this.page.locators.saveSuccessMessage, 30)
	}
}
export default SettingStep
