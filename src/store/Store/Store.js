/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxDamApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
import { toast } from 'react-toastify';
export default class GlobalStore {
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
      if (responsedDataFromLibary) {
        const getDetailCollection = await damService.getCollection(responsedDataFromLibary);
        if (getDetailCollection) {
          runInAction(() => {
            callbackOnSuccess({
              item: getDetailCollection,
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
      const responsedDataFromLibary = await damService.deleteCollections(data);
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
