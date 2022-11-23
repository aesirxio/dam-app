/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';
import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { saveAs } from 'file-saver';
import { makeAutoObservable } from 'mobx';

class DamFormViewModel {
  show = false;
  showContextMenuItem = false;
  showContextMenu = false;
  showDeleteModal = false;
  showCreateCollectionModal = false;
  showUpdateModal = false;
  damEditdata = null;
  editMode = null;
  damListViewModel = null;
  formStatus = PAGE_STATUS.READY;
  damStore = null;

  constructor(damStore) {
    makeAutoObservable(this);
    this.damStore = damStore;
  }

  openContextMenu = () => {
    this.showContextMenu = true;
  };

  closeContextMenu = () => {
    this.showContextMenu = false;
  };

  openContextMenuItem = () => {
    this.showContextMenuItem = true;
  };

  closeContextMenuItem = () => {
    this.showContextMenuItem = false;
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

  openCreateCollectionModal = () => {
    this.showCreateCollectionModal = true;
  };

  closeCreateCollectionModal = () => {
    this.showCreateCollectionModal = false;
  };

  openUpdateCollectionModal = () => {
    this.showUpdateModal = true;
  };

  closeUpdateCollectionModal = () => {
    this.showUpdateModal = false;
  };

  downloadFile = () => {
    const fileSave = new Promise((resolve) => {
      saveAs(
        this.damEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
        this.damEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
      );
      resolve();
    });

    notify(fileSave, 'promise');
  };

  callbackOnErrorHander = (data) => {
    notify(data.message, 'error');
  };

  callbackOnSuccessHandler = (data) => {
    if (data) {
      this.damListViewModel.assets = this.damListViewModel.assets.filter((asset) => {
        return asset.id !== data.id;
      });
    }
  };
}

export default DamFormViewModel;
