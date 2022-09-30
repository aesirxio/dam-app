/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';
import { saveAs } from 'file-saver';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';

class HomeFormViewModel {
  show = false;
  showContextMenu = false;
  showDeleteModal = false;
  homeEditdata = null;
  editMode = null;
  homeListViewModel = null;
  formStatus = PAGE_STATUS.READY;

  homeStore = null;
  projectFormComponent = null;

  constructor(homeStore) {
    makeAutoObservable(this);
    this.homeStore = homeStore;
  }

  openContextMenu = () => {
    this.showContextMenu = true;
  };

  setHomeListViewModel = (honeListViewModalInstance) => {
    this.homeListViewModel = honeListViewModalInstance;
  };

  closeContextMenu = () => {
    // this.editMode = false;
    this.showContextMenu = false;
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  openDeleteModal = () => {
    this.showDeleteModal = true;
  };

  closeDeleteModal = () => {
    this.showDeleteModal = false;
  };

  downloadFile = () => {
    saveAs(
      this.homeEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
      this.homeEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
    );
  };

  callbackOnErrorHander = (data) => {
    notify(data.message, 'error');
  };

  callbackOnSuccessHandler = (data) => {
    if (data) {
      this.homeListViewModel.assets = this.homeListViewModel.assets.filter((asset) => {
        return asset.id !== data.id;
      });
    }
  };
}

export default HomeFormViewModel;
