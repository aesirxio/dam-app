/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-case-declarations */
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import {
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_API_RESPONSE_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-lib';

class DamListViewModel {
  damStore = null;
  collections = [];
  status = PAGE_STATUS.LOADING;
  assets = [];
  tableRowHeader = null;
  dataFilter = {
    'filter[type]': '',
    'list[ordering]': '',
    'list[direction]': '',
    'filter[search]': '',
    'limitAsset': 100,
    'limitstart': 0,
  };

  isList = false;
  damIdsSelected = null;
  isSearch = false;
  subscription = null;
  damLinkFolder = 'root';
  damFormModalViewModel = null;
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

  setLoading = () => {
    this.status = PAGE_STATUS.LOADING;
  };

  setActionState = (state) => {
    this.actionState = {
      ...this.actionState,
      ...state,
    };
  };
  resetActionState = () => {
    this.actionState = {
      cards: [],
      selectedCards: [],
      lastSelectedIndex: -1,
      dragIndex: -1,
      hoverIndex: -1,
      insertIndex: -1,
      isDragging: false,
      style: {},
    };
  };

  setDamFormViewModel = (model) => {
    this.damFormModalViewModel = model;
  };

  // For intergate
  setDamLinkFolder = (link, dataFilter = {}) => {
    this.damLinkFolder = link;
    const collectionId = link.split('/');
    const currentCollection = !isNaN(collectionId[collectionId.length - 1])
      ? collectionId[collectionId.length - 1]
      : 0;
    this.goToFolder(currentCollection, dataFilter);
  };
  // end of intergate

  goToFolder = (collectionId, dataFilter = {}, fetchAssets = false) => {
    this.status = PAGE_STATUS.LOADING;
    this.isSearch = false;

    this.dataFilter = { ...this.dataFilter, ...dataFilter };

    const isFetchAssets = fetchAssets
      ? false
      : this.assets.find((asset) => +asset.collection_id === +collectionId);

    this.resetActionState();

    this.damStore.goToFolder(
      collectionId,
      this.dataFilter,
      this.collections.length ? false : true,
      isFetchAssets ? false : true,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  onFilter = (collectionId, dataFilter = {}, isSort = false) => {
    this.isSearch = false;
    this.status = PAGE_STATUS.LOADING;
    this.dataFilter = { ...this.dataFilter, ...dataFilter };

    this.damStore.goToFolder(
      collectionId,
      this.dataFilter,
      isSort,
      true,
      this.callbackOnFilterSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  createCollections = (data, type = 'client') => {
    if (type === 'client') {
      // fake data in client view
      this.damFormModalViewModel.setOnEditCollection();
      const randomId = Date.now();
      this.collections = this.collections.concat({
        ...data,
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.ID]: randomId,
        create: true,
      });

      setTimeout(() => {
        if (document.querySelector(`#id_${randomId}`)) {
          document.querySelector(`#id_${randomId}`).focus();
        }
      }, 0);
    }
    if (type === 'server') {
      // make real call api to create collection
      notify(
        this.damStore.createCollections(
          data,
          this.callBackOnCollectionCreateSuccessHandler,
          this.callbackOnErrorHandler
        ),
        'promise'
      );
    }
  };

  updateCollections = (data) => {
    notify(
      this.damStore.updateCollections(
        data,
        this.callBackOnCollectionCreateSuccessHandler,
        this.callbackOnErrorHandler
      ),
      'promise'
    );
  };

  createAssets = (data) => {
    notify(
      this.damStore.createAssets(
        data,
        this.callBackOnAssetsCreateSuccessHandler,
        this.callbackOnErrorHandler
      ),
      'promise'
    );
  };

  deleteItem = () => {
    this.damFormModalViewModel.closeModal();
    this.damFormModalViewModel.closeDeleteModal();
    let selectedCollections = [];
    let selectedAssets = [];
    this.actionState.selectedCards.forEach((selected) => {
      if (selected[DAM_ASSETS_FIELD_KEY.TYPE]) {
        selectedAssets.push(selected.id);
      } else {
        selectedCollections.push(selected.id);
      }
    });
    if (selectedAssets.length) {
      this.deleteAssets(selectedAssets);
    }
    if (selectedCollections.length) {
      this.deleteCollections(selectedCollections);
    }
  };

  deleteCollections = (data) => {
    notify(
      this.damStore.deleteCollections(
        data,
        this.callBackOnCollectionCreateSuccessHandler,
        this.callbackOnErrorHandler
      ),
      'promise'
    );
  };

  deleteAssets = (data) => {
    notify(
      this.damStore.deleteAssets(
        data,
        this.callBackOnAssetsCreateSuccessHandler,
        this.callbackOnErrorHandler
      ),
      'promise'
    );
  };

  updateAssets = (data) => {
    notify(
      this.damStore.updateAssets(
        data,
        this.callBackOnAssetsCreateSuccessHandler,
        this.callbackOnErrorHandler
      ),
      'promise'
    );
  };

  moveToFolder = (dragIndex, hoverIndex) => {
    const selectedItem = dragIndex ? dragIndex : this.actionState.selectedCards;
    if (selectedItem.length) {
      const assets = selectedItem
        .filter((asset) => asset[DAM_ASSETS_FIELD_KEY.TYPE])
        .map((item) => item.id);
      const collections = selectedItem
        .filter((collection) => !collection[DAM_ASSETS_FIELD_KEY.TYPE])
        .map((item) => item.id)
        .filter((_collection) => !(+_collection === +hoverIndex));
      const data = {
        [DAM_COLLECTION_FIELD_KEY.PARENT_ID]: hoverIndex,
        [DAM_COLLECTION_FIELD_KEY.ASSETSIDS]: assets ?? [],
        [DAM_COLLECTION_FIELD_KEY.COLLECTIONIDS]: collections ?? [],
      };
      notify(
        this.damStore.moveToFolder(
          data,
          this.callBackOnMoveSuccessHandler,
          this.callbackOnErrorHandler
        ),
        'promise'
      );
    }
  };

  resetObservableProperties = () => {
    this.collections = [];
    this.status = PAGE_STATUS.READY;
    this.assets = [];
    this.tableRowHeader = null;
    this.dataFilter = {
      'filter[type]': '',
      'list[ordering]': '',
      'list[direction]': '',
      'filter[search]': '',
    };

    this.isList = false;
    this.damIdsSelected = null;
    this.isSearch = false;
    this.subscription = null;
    this.damLinkFolder = 'root';
    this.damFormModalViewModel = null;
    this.actionState = {
      cards: [],
      selectedCards: [],
      lastSelectedIndex: -1,
      dragIndex: -1,
      hoverIndex: -1,
      insertIndex: -1,
      isDragging: false,
      style: {},
    };
  };

  callbackOnFilterSuccessHandler = (data) => {
    if (data.collections.length || data.assets.length) {
      this.status = PAGE_STATUS.READY;

      if (data.collections.length) {
        this.collections = [...data.collections];
      }
      if (data.assets.length) {
        this.assets = [...data.assets];
      }
    } else {
      this.assets = [];
      this.status = PAGE_STATUS.ERROR;
    }
  };
  callbackOnErrorHandler = (error) => {
    if (error.message === 'isCancel') {
      this.status = PAGE_STATUS.READY;
    } else notify(error.message, 'error');
  };

  callbackOnSuccessHandler = (data) => {
    if (data.collections.length || data.assets.length) {
      this.status = PAGE_STATUS.READY;

      if (data.collections.length) {
        this.collections = [...this.collections, ...data.collections];
      }
      if (data.assets.length) {
        this.assets = [...this.assets, ...data.assets];
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
              (collection) => collection?.id === data?.item?.id
            );
            this.collections[findIndex] = { ...this.collections[findIndex], ...data.item };
            break;
          case 'delete':
            this.collections = this.collections.filter((collection) => {
              return !data.item.includes(collection.id);
            });
            break;
          case 'create':
            if (data.data) {
              const findIndex = this.collections.findIndex(
                (collection) => collection?.id === data.data?.id
              );
              this.collections[findIndex] = data?.item;
            }

            break;
          default:
            break;
        }
      }
    }
  };
  callBackOnMoveSuccessHandler = (data) => {
    if (data.collections.length || data.assets.length) {
      if (data.collections.length) {
        const newCollections = this.collections.map((collection) => {
          if (data.collections.includes(+collection.id)) {
            return {
              ...collection,
              [DAM_COLLECTION_FIELD_KEY.PARENT_ID]: data.parentCollection,
            };
          } else {
            return collection;
          }
        });
        this.collections = newCollections;
      }
      if (data.assets.length) {
        const newAssets = this.assets.filter((asset) => !data.assets.includes(+asset.id));
        this.assets = newAssets;
      }
      this.resetActionState();
    }
  };
}

export default DamListViewModel;
