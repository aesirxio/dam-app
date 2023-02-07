class  SettingPage
{
    locators = {
        urlSetting: 'setting',
        configurationStorageText: 'Configuration Storage',
        storageLabel: 'Storage*',
        saveSettingButton: ".btn-success",
        storageSelect: '(//div[@class=" css-hlgwow"])[2]',
        storageInput:'(//div[@class=" css-hlgwow"])[2]//input',
        saveSuccessMessage: 'Success',
        clientIdInput: '#key',
        secretInput: '#secret',
        regionInput: '#region',
        bucketInput: '#bucket'
    };
}export default SettingPage;