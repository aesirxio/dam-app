/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxDamApiService, DAM_COLLECTION_FIELD_KEY } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
import DamUtils from './DamUtils';

export default class DamStore {
  getSubscription = async () => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.getDamSubscription();
      if (responsedDataFromLibary) {
        return responsedDataFromLibary;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  updateSubscription = async (data) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.updateDamSubscription(data);
      if (responsedDataFromLibary) {
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
      const responsedDataFromLibary = await damService.getCollections();
      if (responsedDataFromLibary?.list) {
        const collectionDataModel = responsedDataFromLibary?.list;
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
      const responsedDataFromLibary = await damService.createCollections(data);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            item: responsedDataFromLibary,
            type: 'create',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancel') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancel',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'Something went wrong from Server response',
            });
          });
        }
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
      const responsedDataFromLibary = await damService.downloadCollections(id);

      if (responsedDataFromLibary) {
        // saveAs(responsedDataFromLibary, 'aesirx-dam-assets.zip');
        return responsedDataFromLibary;
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
      const responsedDataFromLibary = await damService.updateCollections(data);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'update',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancel') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancel',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'Something went wrong from Server response',
            });
          });
        }
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
      const responsedDataFromLibary = await damService.deleteCollections(data);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'delete',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancel') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancel',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'Something went wrong from Server response',
            });
          });
        }
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
      const responsedDataFromLibary = await damService.createAssets(data);
      console.log('asdasd');
      console.log(responsedDataFromLibary);
      if (responsedDataFromLibary.length) {
        runInAction(() => {
          callbackOnSuccess({
            item: responsedDataFromLibary,
            type: 'create',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancel') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancel',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'Something went wrong from Server response',
            });
          });
        }
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
      const responsedDataFromLibary = await damService.updateAssets(data);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'update',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancel') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancel',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'Something went wrong from Server response',
            });
          });
        }
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
      const responsedDataFromLibary = await damService.moveToFolder(data);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            collections: data[DAM_COLLECTION_FIELD_KEY.COLLECTIONIDS],
            assets: data[DAM_COLLECTION_FIELD_KEY.ASSETSIDS],
            parentCollection: data[DAM_COLLECTION_FIELD_KEY.PARENT_ID],
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancel') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancel',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'Something went wrong from Server response',
            });
          });
        }
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
      const responsedDataFromLibary = await damService.deleteAssets(data);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'delete',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancel') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancel',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'Something went wrong from Server response',
            });
          });
        }
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
      const responsedDataFromLibary = await damService.search({
        'filter[search]': query,
      });
      if (responsedDataFromLibary?.assets || responsedDataFromLibary?.collections) {
        const homeDataModels = DamUtils.transformResponseIntoSearchItems([
          ...responsedDataFromLibary?.assets,
          ...responsedDataFromLibary?.collections,
        ]);

        return homeDataModels;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
