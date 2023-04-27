/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from 'aesirx-uikit';

class UpdateGeneralViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updateGeneralViewModel = null;
  memberInfo = {};
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setAllValue = (updateGeneralViewModel) => {
    this.updateGeneralViewModel = updateGeneralViewModel;
  };

  setForm = (updateGeneralViewModel) => {
    this.updateGeneralViewModel = updateGeneralViewModel;
  };

  initializeData = async (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.memberInfo = await this.profileStore.getMember(id);
    this.formStatus = PAGE_STATUS.READY;
  };

  saveGeneralInformationOnPage = async (data) => {
    await notify(this.profileStore.updateGeneral(data), 'promise');
  };
}

export default UpdateGeneralViewModel;
