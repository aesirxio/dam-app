class CollectionPage {

    locators = {
        urlRoot: 'root',
        h2Text: 'Your digital Assets',
        searchInput: '//input[@placeholder="Search all content"]',
        uploadFileButton: '.btn-success',
        createFolderButton: '.btn-outline-gray-300',
        uploadFileSpan: '//span[contains(text(),\'Upload File\')]',
        createFolderSpan: '//span[contains(text(),\'Create Folder\')]',
        myAssetsSpan: '//span[contains(text(),\'My Assets\')]',
        settingSpan: '//span[contains(text(),\'Setting\')]',
        backSpan: '//span[contains(text(),\'Back\')]',
        previewSpan: '//span[contains(text(),\'Preview\')]',
        moveToFolderSpan: '//span[contains(text(),\'Move to folder\')]',
        downloadFolderSpan: '//span[contains(text(),\'Download Folder\')]',
        deleteSpan: '//span[contains(text(),\'Delete\')]',
        deleteMessage: 'Are you sure you want to delete this folder (including children and assets) ?',
        deleteAssetMessage: 'Are you sure you want to delete this asset ?',
        yesDeleteSpan: '//span[contains(text(),\'Yes, Delete\')]',
        nameInput: '//input[@id=\'name\']',
        deleteButton: '//button//span[contains(text(),\'Delete\')]',
        createButton: "//span[contains(text(),'Create')]",
        saveButton: "//span[contains(text(),'Save')]",
        cancelButton: '//button//span[contains(text(),\'Cancel\')]',
        foldersText: '//p[contains(text(),\'FOLDERS\')]',
        listButton:'//span[contains(text(),\'List\')]',
        thumbButton:'//span[contains(text(),\'Thumb\')]',
        typeSelect: '//div[contains(text(),\'Type\')]',
        sortBySelect: '//div[contains(text(),\'Sort By\')]',
        messageSuccess: 'Success',
        newFolderTitleXpath: '//div[@role="row"]//span[contains(text(),\'New Folder\')]',
        xpathCollectionFirst: "(//div[@type='folder'])[1]",
        xpathAssetsFirst: "(//div[@type='assets'])[1]",
        inputFile: '(//input[@type = \'file\'])[1]'
    };
}export default CollectionPage;