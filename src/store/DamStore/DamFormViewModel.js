/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_FIELD_KEY, DAM_COLLECTION_FIELD_KEY } from 'aesirx-dma-lib';
import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { saveAs } from 'file-saver';

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
  showMoveToFolder = null;
  formStatus = PAGE_STATUS.READY;
  damStore = null;

  constructor(damStore) {
    makeAutoObservable(this);
    this.damStore = damStore;
  }

  openMoveToFolder = () => {
    this.closeContextMenuItem();
    console.log(this.damListViewModel);
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

  downloadFile = async () => {
    if (!this.damListViewModel.actionState.selectedCards.length) {
      notify('', 'error');
      return;
    } else {
      const collectionIds = this.damListViewModel.actionState.selectedCards.map(
        (item) => item?.[DAM_COLLECTION_FIELD_KEY.ID]
      );
      console.log(collectionIds);
      const file = await this.damStore.downloadCollections(collectionIds);
      if (file) {
        saveAs(file, 'aesirx-dam-assets.zip');
      } else {
        notify('', 'error');
      }
    }
    if (this.damEditdata[DAM_ASSETS_FIELD_KEY.TYPE]) {
      saveAs(
        this.damEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
        this.damEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
      );
    }
    // this.closeContextMenuItem();
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
