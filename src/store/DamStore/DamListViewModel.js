/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib';

class DamListViewModel {
  damStore = null;
  collections = [];
  status = PAGE_STATUS.READY;
  assets = [];
  tableRowHeader = null;
  dataFilter = {
    'filter[type]': '',
    'list[ordering]': '',
    'list[direction]': '',
    'filter[search]': '',
  };

  isList = false;
  damIdsSelected = null;
  isSearch = false;
  subscription = null;
  damLinkFolder = 'root';

  actionState = {
    cards: [],
    selectedCards: [],
    lastSelectedIndex: -1,
    dragIndex: -1,
    hoverIndex: -1,
    insertIndex: -1,
    isDragging: false,
    style: {},
  };
  constructor(damStore) {
    makeAutoObservable(this);
    this.damStore = damStore;
  }

  setActionState = (state) => {
    this.actionState = {
      ...this.actionState,
      ...state,
    };
  };

  // For intergate
  setDamLinkFolder = (link) => {
    this.damLinkFolder = link;
    const collectionId = link.split('/');
    const currentCollection = !isNaN(collectionId[collectionId.length - 1])
      ? collectionId[collectionId.length - 1]
      : 0;
    this.goToFolder(currentCollection);
  };
  // end of intergate

  goToFolder = (collectionId, dataFilter = {}) => {
    this.isSearch = false;
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };
    this.damStore.goToFolder(
      collectionId,
      this.dataFilter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  createCollections = (data) => {
    notify(
      this.damStore.createCollections(
        data,
        this.callBackOnCollectionCreateSuccessHandler,
        this.callbackOnErrorHander
      ),
      'promise'
    );
  };

  updateCollections = (data) => {
    notify(
      this.damStore.updateCollections(
        data,
        this.callBackOnCollectionCreateSuccessHandler,
        this.callbackOnErrorHander
      ),
      'promise'
    );
  };

  getAssets = (collectionId, dataFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, dataFilter };
    this.damStore.getAssets(
      collectionId,
      this.dataFilter,
      this.callbackOnAssetsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  filterAssets = (collectionId, dataFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };

    this.damStore.getAssets(
      collectionId,
      this.dataFilter,
      this.callBackOnAssetsFilterSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  createAssets = (data) => {
    notify(
      this.damStore.createAssets(
        data,
        this.callBackOnAssetsCreateSuccessHandler,
        this.callbackOnErrorHander
      ),
      'promise'
    );
  };

  deleteItem = (data) => {
    if (data) {
      console.log(data);
    } else {
      let selectedCollections = [];
      let selectedAssets = [];
      console.log('asd');
      console.log(this.actionState.selectedCards);
      this.actionState.selectedCards.forEach((selected) => {
        console.log(selected[DAM_ASSETS_FIELD_KEY.TYPE]);
        if (selected[DAM_ASSETS_FIELD_KEY.TYPE]) {
          console.log('assets');
          selectedAssets.push(selected.id);
        } else {
          console.log('collection');
          selectedCollections.push(selected.id);
        }
      });
      if (selectedAssets.length) {
        this.deleteAssets(selectedAssets);
      }
      if (selectedCollections.length) {
        this.deleteCollections(selectedCollections);
      }
    }
  };

  deleteCollections = (data) => {
    notify(
      this.damStore.deleteCollections(
        data,
        this.callBackOnCollectionCreateSuccessHandler,
        this.callbackOnErrorHander
      ),
      'promise'
    );
  };

  deleteAssets = (data) => {
    notify(
      this.damStore.deleteAssets(
        data,
        this.callBackOnAssetsCreateSuccessHandler,
        this.callbackOnErrorHander
      ),
      'promise'
    );
  };

  updateAssets = (data) => {
    notify(
      this.damStore.updateAssets(
        data,
        this.callBackOnAssetsCreateSuccessHandler,
        this.callbackOnErrorHander
      ),
      'promise'
    );
  };

  moveToFolder = (dragIndex, hoverIndex) => {
    const selectedItem = this.actionState.selectedCards.map((selected) => selected.id);
    if (selectedItem.length) {
      notify(
        this.damStore.moveToFolder(
          selectedItem,
          hoverIndex,
          this.callBackOnMoveSuccessHandler,
          this.callbackOnErrorHander
        ),
        'promise'
      );
    } else {
      notify(
        this.damStore.moveToFolder(
          [dragIndex],
          hoverIndex,
          this.callBackOnMoveSuccessHandler,
          this.callbackOnErrorHander
        ),
        'promise'
      );
    }
  };

  resetObservableProperties = () => {};

  callbackOnErrorHander = (error) => {
    if (error.message === 'isCancel') {
      this.status = PAGE_STATUS.READY;
    } else notify(error.message, 'error');
  };

  callbackOnSuccessHandler = (data) => {
    if (data.list) {
      this.status = PAGE_STATUS.READY;
      const collections = data.list.filter(
        (collection) => !collection?.[DAM_ASSETS_FIELD_KEY.TYPE]
      );
      const assets = data.list.filter((asset) => asset?.[DAM_ASSETS_FIELD_KEY.TYPE]);
      if (collections) {
        this.collections = [...collections];
      }
      if (assets) {
        this.assets = [...assets];
      }
    } else {
      this.status = PAGE_STATUS.ERROR;
    }
  };

  callBackOnAssetsCreateSuccessHandler = (data) => {
    if (data.item) {
      if (data?.type) {
        switch (data.type) {
          case 'update':
            const findIndex = this.assets.findIndex((asset) => asset.id === data.item.id);
            this.assets[findIndex] = { ...this.assets[findIndex], ...data.item };
            break;
          case 'delete':
            this.assets = this.assets.filter((asset) => {
              return !data.item.includes(asset.id);
            });
            break;
          case 'create':
            this.assets = [...this.assets, ...data?.item];
            break;

          default:
            break;
        }
      }
    }
  };

  callBackOnCollectionCreateSuccessHandler = (data) => {
    if (data.item) {
      if (data?.type) {
        switch (data.type) {
          case 'update':
            const findIndex = this.collections.findIndex(
              (collection) => collection.id === data.item.id
            );
            this.collections[findIndex] = { ...this.collections[findIndex], ...data.item };
            break;
          case 'delete':
            this.collections = this.collections.filter((collection) => {
              return !data.item.includes(collection.id);
            });
            break;
          case 'create':
            this.collections = [...this.collections, data?.item];
            break;

          default:
            break;
        }
      }
    }
  };
}

export default DamListViewModel;
