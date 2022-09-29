/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';

class HomeListViewModel {
  homeStore = null;
  assets = [];
  paginationAssets = null;
  status = PAGE_STATUS.LOADING;
  tableStatus = PAGE_STATUS.LOADING;
  tableRowHeader = null;
  dataFilter = { 'filter[type]': '', 'list[ordering]': '', 'list[direction]': '' };
  pageSize = 5;
  isList = false;
  damIdsSelected = null;
  previewData = {};
  constructor(homeStore) {
    makeAutoObservable(this);
    this.homeStore = homeStore;
  }

  initializeData = () => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.homeStore.getAssets(
      0,
      {},
      this.callbackOnAssetsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  getAssets = (collectionId, dataFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, dataFilter };
    this.homeStore.getAssets(
      collectionId,
      this.dataFilter,
      this.callbackOnAssetsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  filterAssets = (collectionId, dataFilter) => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };

    this.homeStore.getAssets(
      collectionId,
      this.dataFilter,
      this.callBackOnAssetsFilterSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  createAssets = (data) => {
    this.apiPendingStatus = PAGE_STATUS.LOADING;

    notify(
      this.homeStore.createAssets(
        data,
        this.callBackOnAssetsCreateSuccessHandler,
        this.callbackOnErrorHander
      ),
      'promise'
    );
  };

  resetObservableProperties = () => {
    this.assets = [];
    this.paginationAssets = null;
    this.tableRowHeader = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.dataFilter = null;
    this.isList = true;
    this.pageSize = 5;
  };
  callbackOnErrorHander = (error, type) => {
    if (error.message === 'isCancle') {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.READY;
    } else notify(error.message, 'error');
  };

  callbackOnAssetsSuccessHandler = (data) => {
    if (data) {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.READY;
      this.assets = [...this.assets, ...data?.list];
      this.paginationAssets = data.pagination;
    } else {
      this.status = PAGE_STATUS.ERROR;
      this.tableStatus = PAGE_STATUS.READY;
      this.assets = this.assets;
      this.paginationAssets = null;
    }
  };
  callBackOnAssetsCreateSuccessHandler = (data) => {
    if (data.item) {
      this.apiPendingStatus = PAGE_STATUS.READY;

      if (data?.type) {
        switch (data.type) {
          case 'update':
            break;
          case 'delete':
            break;
          case 'create':
            this.assets = [...this.assets, data?.item];
            window.location.reload();
            break;

          default:
            break;
        }
      }
    } else {
      this.apiPendingStatus = PAGE_STATUS.READY;
    }
  };
  callBackOnAssetsFilterSuccessHandler = (data) => {
    if (data) {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.READY;
      this.assets = [...data?.list];
      this.paginationAssets = data.pagination;
    } else {
      this.status = PAGE_STATUS.ERROR;
      this.tableStatus = PAGE_STATUS.READY;
      this.assets = this.assets;
      this.paginationAssets = null;
    }
  };
}

export default HomeListViewModel;
