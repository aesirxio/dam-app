/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxDamApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
import DamUtils from './DamUtils';

export default class DamStore {
  getSubscription = async (callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.getDamSubscription();
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess(responsedDataFromLibary);
        });
      }
      return responsedDataFromLibary;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError({
          message: 'Something went wrong',
        });
      });
      return error;
    }
  };

  updateSubscription = async () => {};

  getCollections = async (collectionId, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.getCollections(collectionId);
      if (responsedDataFromLibary?.list) {
        const collectionDataModel = responsedDataFromLibary?.list;
        if (collectionDataModel) {
          runInAction(() => {
            callbackOnSuccess({
              list: collectionDataModel,
              pagination: responsedDataFromLibary.pagination,
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'No Result',
            });
          });
        }
      } else {
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
    }
  };

  createCollections = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.createCollections(data);
      console.warn(responsedDataFromLibary);
      if (responsedDataFromLibary) {
        const getDetailCollection = await damService.getCollection(responsedDataFromLibary);
        if (getDetailCollection?.item) {
          runInAction(() => {
            callbackOnSuccess({
              item: getDetailCollection.item,
              type: 'create',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'error with getDetail',
            });
          });
        }
      } else {
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
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
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
    }
  };

  deleteCollections = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.deleteCollections(data?.id);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'delete',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
    }
  };

  getAssets = async (collectionId, dataFilter, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.getAssets(collectionId, dataFilter);
      if (responsedDataFromLibary?.list) {
        const homeDataModels = DamUtils.transformPersonaResponseIntoModel(
          responsedDataFromLibary.list
        );
        if (homeDataModels) {
          runInAction(() => {
            callbackOnSuccess({
              list: homeDataModels,
              pagination: responsedDataFromLibary.pagination,
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'No Result',
            });
          });
        }
      } else {
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
    }
  };

  createAssets = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.createAssets(data);
      if (responsedDataFromLibary) {
        const getDetailAsset = await damService.getAsset(responsedDataFromLibary);
        if (getDetailAsset.item) {
          runInAction(() => {
            callbackOnSuccess({
              item: getDetailAsset.item,
              type: 'create',
            });
          });
        } else {
          runInAction(() => {
            callbackOnError({
              message: 'error with getDetail',
            });
          });
        }
      } else {
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message:
            error.response?.data?._messages[0]?.message ??
            'Something went wrong from Server response',
        });
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
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
    }
  };

  deleteAssets = async (data, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.deleteAssets(data?.id);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess({
            item: data,
            type: 'delete',
          });
        });
      } else {
        if (responsedDataFromLibary?.message === 'isCancle') {
          runInAction(() => {
            callbackOnError({
              message: 'isCancle',
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
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
