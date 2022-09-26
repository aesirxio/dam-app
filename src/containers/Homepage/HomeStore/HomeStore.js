/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import HomeUtils from '../HomeUtils/HomeUtils';

import { AesirxDamApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
export default class HomeStore {
  getCollections = async (collectionId, callbackOnSuccess, callbackOnError) => {
    try {
      const homeService = new AesirxDamApiService();
      const responsedDataFromLibary = await homeService.getCollections(collectionId);
      console.log(responsedDataFromLibary);
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
          callbackOnError({
            message: 'Something went wrong from Server response',
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
      return error;
    }
  };

  getAssets = async (collectionId, callbackOnSuccess, callbackOnError) => {
    try {
      const homeService = new AesirxDamApiService();
      const responsedDataFromLibary = await homeService.getAssets(collectionId);
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
          callbackOnError({
            message: 'Something went wrong from Server response',
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
      return error;
    }
  };
}
