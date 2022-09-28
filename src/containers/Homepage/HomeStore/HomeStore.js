/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import HomeUtils from '../HomeUtils/HomeUtils';

import { AesirxDamApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
export default class HomeStore {
  getAssets = async (collectionId, callbackOnSuccess, callbackOnError) => {
    try {
      const damService = new AesirxDamApiService();
      const responsedDataFromLibary = await damService.getAssets(collectionId);
      if (responsedDataFromLibary?.list) {
        const homeDataModels = HomeUtils.transformPersonaResponseIntoModel(
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
        if (getDetailAsset) {
          runInAction(() => {
            callbackOnSuccess({
              item: getDetailAsset,
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
      const responsedDataFromLibary = await damService.deleteAssets(data);
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
}
