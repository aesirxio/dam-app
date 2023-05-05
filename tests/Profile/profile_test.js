import AuthenticationMockData from '../Authentication/Mock/Authentication.data'
import ProfileStep from './Step/ProfileStep'
import LoginSteps from '../Authentication/Step/LoginSteps'
import ProfileMockData from './Mock/ProfileMockData'

const profile = new ProfileStep()
const login = new LoginSteps()
Feature('Profile')

Scenario('Update Profile', async ({ Data, ProfileInfo }) => {
	login.loginOnApp(Data.email, Data.password)
	await profile.updateGeneralInfo(ProfileInfo)
	profile.updatePassword(ProfileInfo)
	login.loginOnApp(Data.email, ProfileInfo.newPassword)
	ProfileInfo.currentPassword = ProfileInfo.newPassword
	ProfileInfo.newPassword = Data.password
	profile.updatePassword(ProfileInfo)
}).injectDependencies({
	Data: AuthenticationMockData.getInformationForLogin(),
	ProfileInfo: ProfileMockData.getUserInformationForUpdate(),
})
