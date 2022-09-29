/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import HomeListViewModel from './HomeListViewModel';
class HomeViewModel {
  homeListViewModel = null;
  constructor(homeStore) {
    if (homeStore) {
      this.homeListViewModel = new HomeListViewModel(homeStore);
    }
  }

  getHomeListViewModel = () => this.homeListViewModel;
}

export default HomeViewModel;
