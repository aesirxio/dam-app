class AssetMockData
{
    static getInformationForUploadAsset()
    {
        const asset = {
            name: 'test_image',
            file: 'Assets/Mock/Media/test_image.png',
        }
        return asset;
    }
    static getInformationForUpdateAsset()
    {
        const asset = {
            name: 'Image update',
        }
        return asset;
    }
}export default AssetMockData;