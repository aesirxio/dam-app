import CollectionPage from '../../Collection/Page/CollectionPage';
const { I } = inject();
class AssetSteps
{
    constructor() {
        this.page = new CollectionPage();
    }

    createAsset(asset)
    {
        I.amOnPage(this.page.locators.urlRoot);
        I.waitForText(this.page.locators.h2Text, 30);
        I.waitForElement(this.page.locators.inputFile, 30);
        I.attachFile(this.page.locators.inputFile, asset.file);
        I.waitForText(this.page.locators.messageSuccess, 30);
        I.waitForText( asset.name, 30);
    }
    searchAsset(assetName)
    {
        I.amOnPage(this.page.locators.urlRoot);
        I.waitForText(this.page.locators.h2Text, 30);
        I.waitForElement(this.page.locators.searchInput);
        I.fillField(this.page.locators.searchInput, assetName);
        I.wait(2);
        I.pressKey('Enter');
        I.waitForText(assetName, 30, this.page.locators.xpathAssetsFirst);
    }
    updateName(asset, assetUpdate)
    {
        this.searchAsset(asset.name);
        I.waitForElement(this.page.locators.xpathAssetsFirst, 30);
        I.rightClick(this.page.locators.xpathAssetsFirst);
        I.waitForElement(this.page.locators.previewSpan);
        I.click(this.page.locators.previewSpan);
        I.waitForElement(this.page.locators.nameInput);
        I.fillField(this.page.locators.nameInput, assetUpdate.name);
        I.waitForElement(this.page.locators.saveButton);
        I.click(this.page.locators.saveButton);
        I.waitForText(this.page.locators.messageSuccess, 30);
        I.waitForText(assetUpdate.name, 30, this.page.locators.xpathAssetsFirst);
    }
    deleteAsset(asset)
    {
        this.searchAsset(asset.name);
        I.waitForElement(this.page.locators.xpathAssetsFirst, 30);
        I.rightClick(this.page.locators.xpathAssetsFirst);
        I.waitForElement(this.page.locators.deleteSpan);
        I.click(this.page.locators.deleteSpan);
        I.waitForText(this.page.locators.deleteAssetMessage, 30);
        I.waitForElement(this.page.locators.yesDeleteSpan);
        I.click(this.page.locators.yesDeleteSpan);
        I.waitForText(this.page.locators.messageSuccess, 30);
        I.dontSee(asset.name);
    }

}export default AssetSteps;