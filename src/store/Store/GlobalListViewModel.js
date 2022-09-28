/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';

class GlobalListViewModel {
  globalStore = null;
  paginationCollections = null;
  collections = [];
  status = PAGE_STATUS.LOADING;
  dataFilter = null;

  constructor(globalStore) {
    makeAutoObservable(this);
    this.globalStore = globalStore;
  }

  initializeData = () => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.globalStore.getCollections(
      0,
      this.callbackOnCollectionsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  gotoFolder = (collectionId) => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.globalStore.getCollections(
      collectionId,
      this.callbackOnCollectionsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  getCollection = (collectionId) => {
    this.status = PAGE_STATUS.LOADING;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.globalStore.getCollections(
      collectionId,
      this.callbackOnCollectionsSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  resetObservableProperties = () => {
    this.collections = [];
    this.paginationCollections = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.dataFilter = null;
  };
  callbackOnErrorHander = (error) => {
    if (error.message === 'isCancle') {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.READY;
    } else notify(error.message);
  };

  callbackOnCollectionsSuccessHandler = (data) => {
    if (data) {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.READY;
      this.collections = [...this.collections, ...data?.list];
      this.paginationCollections = data.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.READY;
      this.status = PAGE_STATUS.ERROR;
      this.collections = this.collections;
      this.paginationCollections = null;
    }
  };
}

export default GlobalListViewModel;
