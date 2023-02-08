import LoginSteps from '../Authentication/Step/LoginSteps';
import AuthenticationMockData from '../Authentication/Mock/Authentication.data';
import AssetSteps from './Step/AssetSteps';
import AssetMockData from './Mock/AssetMockData';

const login = new LoginSteps();
const asset = new AssetSteps();

Feature('Asset');

Scenario('Create Asset', ({ Data, Asset}) => {
    login.loginOnApp(Data.email, Data.password);
    asset.createAsset(Asset);

}).injectDependencies({
    Data: AuthenticationMockData.getInformationForLogin(),
    Asset: AssetMockData.getInformationForUploadAsset(),
    AssetUpdate: AssetMockData.getInformationForUpdateAsset()
});
Scenario('Update Asset', ({ Data, Asset, AssetUpdate }) => {
    login.loginOnApp(Data.email, Data.password);
    asset.updateName(Asset, AssetUpdate);

}).injectDependencies({
    Data: AuthenticationMockData.getInformationForLogin(),
    Asset: AssetMockData.getInformationForUploadAsset(),
    AssetUpdate: AssetMockData.getInformationForUpdateAsset()

});
Scenario('Delete Asset', ({ Data, AssetUpdate }) => {
    login.loginOnApp(Data.email, Data.password);
    asset.deleteAsset(AssetUpdate);

}).injectDependencies({
    Data: AuthenticationMockData.getInformationForLogin(),
    AssetUpdate: AssetMockData.getInformationForUpdateAsset()

});