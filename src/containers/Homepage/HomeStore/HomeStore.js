/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import HomeUtils from '../HomeUtils/HomeUtils';

import { AesirxDamApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
export default class HomeStore {
  getCollections = async (callbackOnSuccess, callbackOnError) => {
    try {
      const homeService = new AesirxDamApiService();
      const responsedDataFromLibary = await homeService.getCollections();
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
      return null;
    }
  };

  getAssets = async (callbackOnSuccess, callbackOnError) => {
    try {
      const homeService = new AesirxDamApiService();
      const responsedDataFromLibary = await homeService.getAssets();
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
      return null;
    }
  };
}
