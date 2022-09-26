/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';

class HomeListViewModel {
  homeStore = null;
  paginationCollections = null;
  collections = [];
  assets = [];
  paginationAssets = null;
  status = PAGE_STATUS.LOADING;
  tableStatus = PAGE_STATUS.LOADING;
  tableRowHeader = null;
  dataFilter = null;
  pageSize = 5;
  isList = false;
  damIdsSelected = null;

  constructor(homeStore) {
    makeAutoObservable(this);
    this.homeStore = homeStore;
  }

  initializeData = () => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.homeStore.getCollections(
      0,
      this.callbackOnCollectionsSuccessHandler,
      this.callbackOnErrorHander
    );
    this.homeStore.getAssets(0, this.callbackOnAssetsSuccessHandler, this.callbackOnErrorHander);
  };

  gotoFolder = (collectionId) => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.homeStore.getCollections(
      collectionId,
      this.callbackOnCollectionsSuccessHandler,
      this.callbackOnErrorHander
    );
    this.homeStore.getAssets(
      collectionId,
      this.callbackOnAssetsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  getCollection = (collectionId) => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.homeStore.getCollections(
      collectionId,
      this.callbackOnCollectionsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  resetObservableProperties = () => {
    this.collections = [];
    this.paginationCollections = null;
    this.assets = [];
    this.paginationAssets = null;
    this.tableRowHeader = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.dataFilter = null;
    this.isList = true;
    this.pageSize = 5;
  };
  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnCollectionsSuccessHandler = (data) => {
    if (data) {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.READY;
      this.collections = data?.list ?? [];
      this.paginationCollections = data.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.ERROR;
      this.collections = [];
      this.paginationCollections = null;
    }
  };

  callbackOnAssetsSuccessHandler = (data) => {
    if (data) {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.READY;
      this.assets = data.list ?? [];
      this.paginationAssets = data.pagination;
    } else {
      this.status = PAGE_STATUS.ERROR;
      this.tableStatus = PAGE_STATUS.READY;
      this.assets = [];
      this.paginationAssets = null;
    }
  };
}

export default HomeListViewModel;
