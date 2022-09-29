/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import HomeListViewModel from './HomeListViewModel';
import HomeFromViewModel from './HomeFormModalViewModal';
class HomeViewModel {
  homeListViewModel = null;
  homeFormViewModel = null;
  constructor(homeStore) {
    if (homeStore) {
      this.homeListViewModel = new HomeListViewModel(homeStore);
      this.homeFormViewModel = new HomeFromViewModel(homeStore);
    }
  }

  getHomeListViewModel = () => this.homeListViewModel;
  getHomeFormViewModel = () => this.homeFormViewModel;
}

export default HomeViewModel;
