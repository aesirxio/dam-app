import LoginSteps from './Step/LoginSteps'
import AuthenticationMockData from './Mock/Authentication.data'

Feature('Login')

Scenario('Login on app', ({ Data }) => {
	let login = new LoginSteps()
	login.loginOnApp(Data.email, Data.password)
}).injectDependencies({
	Data: AuthenticationMockData.getInformationForLogin(),
})
