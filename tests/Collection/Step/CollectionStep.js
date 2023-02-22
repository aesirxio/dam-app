import CollectionPage from '../Page/CollectionPage'

const { I } = inject()
class CollectionStep {
	constructor() {
		this.page = new CollectionPage()
	}

	createCollection(collectionName) {
		I.amOnPage(this.page.locators.urlRoot)
		I.waitForText(this.page.locators.h2Text, 30)
		I.waitForElement(this.page.locators.createFolderButton, 30)
		I.click(this.page.locators.createFolderButton)
		I.waitForElement(this.page.locators.nameInput, 30)
		I.fillField(this.page.locators.nameInput, collectionName)
		I.waitForElement(this.page.locators.createButton)
		I.click(this.page.locators.createButton)
		I.waitForText(this.page.locators.messageSuccess, 30)
		I.waitForElement(this.page.locators.closeMessageSuccess, 30)
		I.click(this.page.locators.closeMessageSuccess)
		I.waitForText(collectionName, 30)
	}

	searchCollection(collectionName) {
		I.amOnPage(this.page.locators.urlRoot)
		I.waitForText(this.page.locators.h2Text, 30)
		I.waitForElement(this.page.locators.searchInput)
		I.fillField(this.page.locators.searchInput, collectionName)
		I.pressKey('Enter')
		I.waitForText(collectionName, 30, this.page.locators.xpathCollectionFirst)
	}

	updateCollectionName(collectionName, collectionNameUpdate) {
		I.waitForText(collectionName, 30, this.page.locators.xpathCollectionFirst)
		I.waitForElement(this.page.locators.xpathCollectionFirst, 30)
		I.rightClick(this.page.locators.xpathCollectionFirst)
		I.waitForElement(this.page.locators.previewSpan)
		I.click(this.page.locators.previewSpan)
		I.waitForElement(this.page.locators.nameInput)
		I.fillField(this.page.locators.nameInput, collectionNameUpdate)
		I.waitForElement(this.page.locators.saveButton)
		I.click(this.page.locators.saveButton)
		I.waitForText(this.page.locators.messageSuccess, 30)
		I.waitForElement(this.page.locators.closeMessageSuccess, 30)
		I.click(this.page.locators.closeMessageSuccess)
		I.waitForText(collectionNameUpdate, 30, this.page.locators.xpathCollectionFirst)
	}

	deleteCollection(collectionName) {
		I.waitForText(collectionName, 30, this.page.locators.xpathCollectionFirst)
		I.waitForElement(this.page.locators.xpathCollectionFirst, 30)
		I.rightClick(this.page.locators.xpathCollectionFirst)
		I.waitForElement(this.page.locators.deleteSpan)
		I.click(this.page.locators.deleteSpan)
		I.waitForText(this.page.locators.deleteMessage, 30)
		I.waitForElement(this.page.locators.yesDeleteSpan)
		I.click(this.page.locators.yesDeleteSpan)
		I.waitForText(this.page.locators.messageSuccess, 30)
		I.waitForElement(this.page.locators.closeMessageSuccess, 30)
		I.click(this.page.locators.closeMessageSuccess)
		I.dontSee(collectionName)
	}
}
export default CollectionStep
