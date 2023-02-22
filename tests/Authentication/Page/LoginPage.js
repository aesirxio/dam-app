class LoginPage {
	locators = {
		url: 'login',
		signInText: 'Sign In to getting started.',
		emailInput: '//input[@name="username"]',
		emailLabel: 'Email *',
		passwordInput: '//input[@name="password"]',
		passwordLabel: 'Password *',
		signInButton: '.btn-success',
		forGotPasswordText: "//a[contains(text(),'Forgot Password?')]",
		adminText: 'Your digital Assets',
		signOutSpan: "//span[contains(text(),'Sign Out')]",
	}
}
export default LoginPage
