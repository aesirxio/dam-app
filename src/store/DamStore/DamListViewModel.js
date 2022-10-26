/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';

class DamListViewModel {
  damStore = null;
  paginationCollections = null;
  collections = [];
  status = PAGE_STATUS.READY;
  assets = [];
  paginationAssets = null;
  tableRowHeader = null;
  dataFilter = {
    'filter[type]': '',
    'list[ordering]': '',
    'list[direction]': '',
    'filter[search]': '',
  };
  pageSize = 5;
  isList = false;
  damIdsSelected = null;
  isSearch = false;
  subscription = null;
  constructor(damStore) {
    makeAutoObservable(this);
    this.damStore = damStore;
  }

  getSubscription = () => {
    this.damStore.getSubscription(
      this.callbackOnSubscriptionSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  getCollections = (collectionId) => {
    this.isSearch = false;
    this.status = PAGE_STATUS.LOADING;
    this.damStore.getCollections(
      collectionId,
      this.callbackOnCollectionsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  getAllCollections = () => {
    this.isSearch = false;
    this.status = PAGE_STATUS.LOADING;
    this.damStore.getAllCollections(
      this.callbackOnCollectionsSuccessHandler,
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

  resetObservableProperties = () => {};

  callbackOnErrorHander = (error) => {
    if (error.message === 'isCancel') {
      this.status = PAGE_STATUS.READY;
    } else notify(error.message, 'error');
  };

  callbackOnAssetsSuccessHandler = (data) => {
    if (data) {
      this.status = PAGE_STATUS.READY;
      this.assets = [...data?.list];
      this.paginationAssets = data.pagination;
    } else {
      this.status = PAGE_STATUS.ERROR;
      this.paginationAssets = null;
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
              return asset.id !== data.item?.id;
            });
            break;
          case 'create':
            this.assets = [...this.assets, data?.item];
            break;

          default:
            break;
        }
      }
    }
  };

  callBackOnAssetsFilterSuccessHandler = (data) => {
    if (data) {
      this.status = PAGE_STATUS.READY;
      this.assets = [...data?.list];
      this.paginationAssets = data.pagination;
    } else {
      this.status = PAGE_STATUS.ERROR;
      this.paginationAssets = null;
    }
  };

  callbackOnCollectionsSuccessHandler = (data) => {
    if (data) {
      this.status = PAGE_STATUS.READY;
      this.collections = [...data?.list];
      this.paginationCollections = data.pagination;
    } else {
      this.status = PAGE_STATUS.ERROR;
      this.paginationCollections = null;
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
              return collection.id !== data.item?.id;
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

  callbackOnSubscriptionSuccessHandler = (data) => {
    if (data) {
      this.subscription = data;
    } else {
      this.status = PAGE_STATUS.READY;
    }
  };
}

export default DamListViewModel;
