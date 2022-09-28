/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import GlobalListViewModel from './GlobalListViewModel';

class GlobalViewModel {
  globalViewModel = null;
  constructor(homeStore) {
    if (homeStore) {
      this.globalViewModel = new GlobalListViewModel(homeStore);
    }
  }

  getGlobalViewModel = () => this.globalViewModel;
}

export default GlobalViewModel;
