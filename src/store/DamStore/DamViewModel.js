/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import DamListViewModel from './DamListViewModel';
import DamFromViewModel from './DamFormViewModel';
class DamViewModel {
  damListViewModel = null;
  damFormViewModel = null;
  constructor(damStore) {
    if (damStore) {
      this.damListViewModel = new DamListViewModel(damStore);
      this.damFormViewModel = new DamFromViewModel(damStore);
      this.damListViewModel.setDamFormViewModel(this.damFormViewModel);
    }
  }

  getDamListViewModel = () => this.damListViewModel;
  getDamFormViewModel = () => this.damFormViewModel;
}

export default DamViewModel;
