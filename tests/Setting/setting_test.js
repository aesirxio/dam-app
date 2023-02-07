import AuthenticationMockData from '../Authentication/Mock/Authentication.data';
import SettingStep from './Step/SettingStep';
import LoginSteps from '../Authentication/Step/LoginSteps';
import SettingMockData from './Mock/SettingMockData';

const setting = new SettingStep();
const login = new LoginSteps();
Feature('Setting');
Scenario('Setting Storage default', ({ Data}) => {
    login.loginOnApp(Data.email, Data.password);
    setting.settingStorageDefault();
}).injectDependencies({
    Data: AuthenticationMockData.getInformationForLogin(),
});
Scenario('Setting Storage AWS', ({ Data, Setting}) => {
    login.loginOnApp(Data.email, Data.password);
    setting.settingStorageAWS(Setting);
}).injectDependencies({
    Data: AuthenticationMockData.getInformationForLogin(),
    Setting: SettingMockData.getInfoToUpdateStoreAWS()
});