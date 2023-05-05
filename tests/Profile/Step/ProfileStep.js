import ProfilePage from '../Page/ProfilePage'

const { I } = inject()

class ProfileStep {
	constructor() {
		this.page = new ProfilePage()
	}

	async updateGeneralInfo(profile) {
		I.amOnPage(this.page.locators.urlProfile)
		I.waitForText(this.page.locators.generalInformationText, 30)
		I.waitForElement(this.page.locators.fullNameInput, 30)
		I.fillField(this.page.locators.fullNameInput, profile.fullName)
		I.waitForElement(this.page.locators.phoneInput, 30)
		I.fillField(this.page.locators.phoneInput, profile.phone)
		I.waitForElement(this.page.locators.updateGeneralButton, 30)
		I.click(this.page.locators.updateGeneralButton)
		I.waitForText(this.page.locators.messageSuccess, 30)
		I.seeInField(this.page.locators.fullNameInput, profile.fullName)
		I.seeInField(this.page.locators.phoneInput, profile.phone)
	}

	updatePassword(profile) {
		I.amOnPage(this.page.locators.urlProfile)
		I.waitForElement(this.page.locators.passwordSection, 30)
		I.scrollTo(this.page.locators.passwordSection)
		I.waitForText(this.page.locators.passwordText, 30)
		I.waitForElement(this.page.locators.currentPasswordInput, 30)
		I.fillField(this.page.locators.currentPasswordInput, profile.currentPassword)
		I.waitForElement(this.page.locators.newPasswordInput, 30)
		I.fillField(this.page.locators.newPasswordInput, profile.newPassword)
		I.waitForElement(this.page.locators.confirmNewPasswordInput, 30)
		I.fillField(this.page.locators.confirmNewPasswordInput, profile.newPassword)
		I.waitForElement(this.page.locators.updatePasswordButton, 30)
		I.click(this.page.locators.updatePasswordButton)
		I.waitForText(this.page.locators.welcomeText, 30)
	}
}
export default ProfileStep
