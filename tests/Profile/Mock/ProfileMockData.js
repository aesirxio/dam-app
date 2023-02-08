class ProfileMockData
{
    static getUserInformationForUpdate()
    {
        const profile = {
            fullName: "Demo-dam",
            phone: "(+84) 28 3838 9052",
            currentPassword: 'demo-dam',
            newPassword: '123456'
        }
        return profile;
    }
}export default ProfileMockData;