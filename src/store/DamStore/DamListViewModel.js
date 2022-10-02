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
  status = PAGE_STATUS.LOADING;
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
  constructor(damStore) {
    makeAutoObservable(this);
    this.damStore = damStore;
  }

  getCollections = (collectionId) => {
    this.isSearch = false;
    this.status = PAGE_STATUS.LOADING;
    this.damStore.getCollections(
      collectionId,
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

  resetObservableProperties = () => {
    // this.collections = [];
    // this.paginationCollections = null;
    // this.dataFilter = null;
    // this.assets = [];
    // this.paginationAssets = null;
    // this.tableRowHeader = null;
    // this.dataFilter = null;
    // this.isList = true;
    // this.pageSize = 5;
  };

  callbackOnErrorHander = (error) => {
    if (error.message === 'isCancle') {
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
      // this.assets = this.assets;
      this.paginationAssets = null;
    }
  };

  callBackOnAssetsCreateSuccessHandler = (data) => {
    if (data.item) {
      // this.apiPendingStatus = PAGE_STATUS.READY;

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
            // window.location.reload();
            break;

          default:
            break;
        }
      }
    } else {
      // this.apiPendingStatus = PAGE_STATUS.READY;
    }
  };

  callBackOnAssetsFilterSuccessHandler = (data) => {
    if (data) {
      this.status = PAGE_STATUS.READY;
      this.assets = [...data?.list];
      this.paginationAssets = data.pagination;
    } else {
      this.status = PAGE_STATUS.ERROR;
      // this.assets = this.assets;
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
      // this.collections = this.collections;
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
    } else {
    }
  };
}

export default DamListViewModel;
