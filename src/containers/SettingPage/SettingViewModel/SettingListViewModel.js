/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';

class SettingListViewModel {
  settingStore = null;

  constructor(settingStore) {
    makeAutoObservable(this);
    this.settingStore = settingStore;
  }
}

export default SettingListViewModel;
