/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_API_RESPONSE_FIELD_KEY,
} from 'aesirx-lib';
import { notify } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';

import { makeAutoObservable } from 'mobx';

class DamFormViewModel {
  show = false;
  showContextMenuItem = false;
  showContextMenu = false;
  showDeleteModal = false;
  isEditCollection = false;
  damEditdata = null;
  editMode = null;
  damListViewModel = null;
  showMoveToFolder = null;
  formStatus = PAGE_STATUS.READY;
  damStore = null;

  constructor(damStore) {
    makeAutoObservable(this);
    this.damStore = damStore;
  }

  openMoveToFolder = () => {
    this.closeContextMenuItem();
    if (this.damListViewModel.actionState.selectedCards.length) {
      this.showMoveToFolder = true;
    } else {
      notify('please choose item to move', 'warn');
    }
  };

  setDamListViewModel = (damListViewModel) => {
    this.damListViewModel = damListViewModel;
  };

  closeMoveToFolder = () => {
    this.showMoveToFolder = false;
  };

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

  setOnEditCollection = () => {
    this.isEditCollection = true;
  };

  setOffEditCollection = () => {
    this.isEditCollection = false;
  };

  downloadFile = async () => {
    if (!this.damListViewModel.actionState.selectedCards.length) {
      notify('Please choose one item to download', 'warn');
      return;
    } else {
      const collectionIds = this.damListViewModel.actionState.selectedCards
        .filter((item) => !item?.[DAM_ASSETS_FIELD_KEY.TYPE])
        .map((id) => id[DAM_COLLECTION_API_RESPONSE_FIELD_KEY.ID]);

      const assetIds = this.damListViewModel.actionState.selectedCards
        .filter((item) => item?.[DAM_ASSETS_FIELD_KEY.TYPE])
        .map((id) => id[DAM_ASSETS_API_FIELD_KEY.ID]);
      if (collectionIds || assetIds) {
        notify(
          this.damStore.downloadCollections({
            [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.ASSETSIDS]: assetIds,
            [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.COLLECTIONIDS]: collectionIds,
          }),
          'promise'
        );
      }
    }

    this.closeContextMenuItem();
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
