import LoginPage from '../Page/LoginPage'

const { I } = inject()

class LoginSteps {
	constructor() {
		this.page = new LoginPage()
	}

	loginOnApp(email, password) {
		I.amOnPage(this.page.locators.url)
		I.waitForText(this.page.locators.signInText, 30)
		I.waitForText(this.page.locators.emailLabel, 30)
		I.waitForElement(this.page.locators.emailInput, 30)
		I.fillField(this.page.locators.emailInput, email)
		I.waitForElement(this.page.locators.passwordInput, 30)
		I.clearField(this.page.locators.passwordInput)
		I.fillField(this.page.locators.passwordInput, password)
		I.waitForElement(this.page.locators.forGotPasswordText, 30)
		I.waitForElement(this.page.locators.signInButton, 30)
		I.click(this.page.locators.signInButton)
		I.waitForText(this.page.locators.adminText, 30)
	}
}
export default LoginSteps
