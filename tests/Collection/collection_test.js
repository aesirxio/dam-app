import LoginSteps from '../Authentication/Step/LoginSteps';
import CollectionStep from './Step/CollectionStep';
import AuthenticationMockData from '../Authentication/Mock/Authentication.data';
import CollectionMockData from './Mock/CollectionMockData';

const login = new LoginSteps();
const collection = new CollectionStep();

Feature('Collection');

Scenario('Create collection', ({ Data, Collection }) => {
    login.loginOnApp(Data.email, Data.password);
    collection.createCollection(Collection.name);
    collection.updateCollectionName(Collection.name, Collection.nameUpdate);
    collection.deleteCollection(Collection.nameUpdate);
}).injectDependencies({
    Data: AuthenticationMockData.getInformationForLogin(),
    Collection: CollectionMockData.getInformationCollectionForCreate()
});
