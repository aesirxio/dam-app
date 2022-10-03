/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import SettingListViewModel from './SettingListViewModel';
class HomeViewModel {
  settingListViewModel = null;
  constructor(settingStore) {
    if (settingStore) {
      this.settingListViewModel = new SettingListViewModel(settingStore);
    }
  }

  getSettingListViewModel = () => this.settingListViewModel;
}

export default HomeViewModel;
