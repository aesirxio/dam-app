/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxDamApiService, DAM_COLLECTION_FIELD_KEY } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
import DamUtils from './DamUtils';
import { saveAs } from 'file-saver';

export default class DamStore {
  getSubscription = async () => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.getDamSubscription();
      if (responseDataFromLibrary) {
        return responseDataFromLibrary;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  updateSubscription = async (data) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.updateDamSubscription(data);
      if (responseDataFromLibrary) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  goToFolder = async (
    collectionId,
    dataFilter,
    isFetchCollection,
    isFetchAssets,
    callbackOnSuccess,
    callbackOnError
  ) => {
    try {
      let collections = [];
      let assets = [];
      const damService = new AesirxDamApiService();
      if (isFetchCollection) {
        const responsedDataCollectionFromLibary = await damService.getCollections(
          collectionId,
          dataFilter
        );

        if (responsedDataCollectionFromLibary?.list) {
          const collectionsData = DamUtils.transformPersonaResponseIntoModel(
            responsedDataCollectionFromLibary.list
          );
          collections = [...collectionsData];
        }
      }

      if (isFetchAssets) {
        const responsedDataAssetsFromLibary = await damService.getAssets(collectionId, dataFilter);

        if (responsedDataAssetsFromLibary?.list) {
          const assetsData = DamUtils.transformPersonaResponseIntoModel(
            responsedDataAssetsFromLibary.list
          );
          assets = [...assetsData];
        }
      }
      runInAction(() => {
        callbackOnSuccess({
          collections: collections,
          assets: assets,
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        if (error.response?.data.message) {
          callbackOnError({
            message: error.response?.data?.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  getAllCollections = async () => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.getCollections();
      if (responseDataFromLibrary?.list) {
        const collectionDataModel = responseDataFromLibrary?.list;
        if (collectionDataModel) {
          return collectionDataModel;
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  createCollections = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.createCollections(data);
      if (responseDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess({
            data: data,
            item: responseDataFromLibrary,
            type: 'create',
          });
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      runInAction(() => {
        if (error.response?.data?.message) {
          callbackOnError({
            message: error.response?.data.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  downloadCollections = async (id) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.downloadCollections(id);

      if (responseDataFromLibrary) {
        saveAs(responseDataFromLibrary, 'aesirx-dam-assets.zip');
        return responseDataFromLibrary;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  updateCollections = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.updateCollections(data);
      if (responseDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'update',
          });
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      runInAction(() => {
        if (error.response?.data.message) {
          callbackOnError({
            message: error.response?.data?.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  deleteCollections = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.deleteCollections(data);
      if (responseDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'delete',
          });
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      runInAction(() => {
        if (error.response?.data.message) {
          callbackOnError({
            message: error.response?.data?.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  createAssets = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.createAssets(data);
      console.log('asdasd');
      console.log(responseDataFromLibrary);
      if (responseDataFromLibrary.length) {
        runInAction(() => {
          callbackOnSuccess({
            item: responseDataFromLibrary,
            type: 'create',
          });
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      runInAction(() => {
        if (error.response?.data.message) {
          callbackOnError({
            message: error.response?.data?.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  updateAssets = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.updateAssets(data);
      if (responseDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'update',
          });
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      runInAction(() => {
        if (error.response?.data.message) {
          callbackOnError({
            message: error.response?.data?.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  moveToFolder = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.moveToFolder(data);
      if (responseDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess({
            collections: data[DAM_COLLECTION_FIELD_KEY.COLLECTIONIDS],
            assets: data[DAM_COLLECTION_FIELD_KEY.ASSETSIDS],
            parentCollection: data[DAM_COLLECTION_FIELD_KEY.PARENT_ID],
          });
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        if (error.response?.data.message) {
          callbackOnError({
            message: error.response?.data?.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  deleteAssets = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.deleteAssets(data);
      if (responseDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'delete',
          });
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        if (error.response?.data.message) {
          callbackOnError({
            message: error.response?.data?.message,
          });
        } else {
          callbackOnError({
            message:
              error.response?.data?._messages[0]?.message ??
              'Something went wrong from Server response',
          });
        }
      });
    }
  };

  search = async (query) => {
    try {
      const damService = new AesirxDamApiService();
      const responseDataFromLibrary = await damService.search({
        'filter[search]': query,
      });
      if (responseDataFromLibrary?.assets || responseDataFromLibrary?.collections) {
        const homeDataModels = DamUtils.transformResponseIntoSearchItems([
          ...responseDataFromLibrary?.assets,
          ...responseDataFromLibrary?.collections,
        ]);

        return homeDataModels;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
