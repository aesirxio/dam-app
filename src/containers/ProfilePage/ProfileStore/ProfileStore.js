/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxMemberApiService } from 'aesirx-lib';
import { runInAction } from 'mobx';
import ProfileModel from '../ProfileModel/ProfileModel';

export default class ProfileStore {
  async updatePassword(updatePasswordData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdatePasswordData =
        ProfileModel.convertSubmittedPasswordDataToAPIService(updatePasswordData);

      let resultOnSave;
      const updatePasswordApiService = new AesirxMemberApiService();
      resultOnSave = await updatePasswordApiService.updateMemberPassword(
        convertedUpdatePasswordData
      );

      if (resultOnSave.result.success) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async updateGeneral(updateGeneralData) {
    try {
      const convertedUpdateGeneralData =
        ProfileModel.convertSubmittedGeneralDataToAPIService(updateGeneralData);
      const updateGeneralApiService = new AesirxMemberApiService();

      return await updateGeneralApiService.updateMember(convertedUpdateGeneralData);
    } catch (error) {
      return false;
    }
  }

  async getMember(id) {
    if (!id) return null;

    try {
      const getMemberInfoAPIService = new AesirxMemberApiService();
      return await getMemberInfoAPIService.getMemberInfo(id);
    } catch (error) {
      return null;
    }
  }

  async getMemberProfile(id) {
    if (!id) return false;

    try {
      const getMemberInfoAPIService = new AesirxMemberApiService();
      const respondedData = await getMemberInfoAPIService.getMemberInfo(id);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }
}
