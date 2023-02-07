class ProfilePage
{
    locators = {
        urlProfile: 'profile',
        generalInformationText: 'General Information',
        fullNameInput: '//input[@id=\'fullname\']',
        phoneInput: '//input[@id=\'phone\']',
        updateGeneralButton: '(//span[contains(text(),\'Update\')])[1]',
        profileSpan: '//span[contains(text(),\'Profile\')]',
        passwordSection: "//h2[contains(text(),'Password')]",
        passwordText: 'Password',
        currentPasswordInput: '#curr_password',
        newPasswordInput: '#new_password',
        confirmNewPasswordInput: '#new_checked_password',
        updatePasswordButton: '(//span[contains(text(),\'Update\')])[2]',
        messageSuccess: 'Success',
        welcomeText: 'Sign In to getting started.',
    }
}export default ProfilePage;