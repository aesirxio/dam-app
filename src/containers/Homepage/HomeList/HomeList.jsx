/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import '../index.scss';

import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-dma-lib';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import history from 'routes/history';
import ComponentImage from 'components/ComponentImage';
import ComponentNoData from 'components/ComponentNoData';
import Spinner from 'components/Spinner';
import Table from 'components/Table';
import { DAM_COLUMN_INDICATOR } from 'constants/DamConstant';
import PAGE_STATUS from 'constants/PageStatus';
import styles from '../index.module.scss';
import utils from '../HomeUtils/HomeUtils';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';

const HomeList = observer(
  class HomeList extends Component {
    damListViewModel = null;
    damformModalViewModal = null;

    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.damListViewModel = this.viewModel ? this.viewModel.getDamListViewModel() : null;
      this.damformModalViewModal = this.viewModel ? this.viewModel.getDamFormViewModel() : null;
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
      const collectionId = history.location.pathname.split('/');
      const curretnCollectionId = !isNaN(collectionId[collectionId.length - 1])
        ? collectionId[collectionId.length - 1]
        : 0;
      this.damListViewModel.goToFolder(curretnCollectionId);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        const collectionId = history.location.pathname.split('/');
        const curretnCollectionId = !isNaN(collectionId[collectionId.length - 1])
          ? collectionId[collectionId.length - 1]
          : 0;
        this.damListViewModel.goToFolder(curretnCollectionId);
      }
    }

    handleClickOutside = (e) => {
      const checkContextMenu = e.target.closest('#contextMenu');
      const checkContextMenuItem = e.target.closest('#contextMenuItem');

      if (checkContextMenu || checkContextMenuItem) {
        return;
      } else {
        this.damformModalViewModal.closeContextMenu();
        this.damformModalViewModal.closeContextMenuItem();
      }
    };

    handleSelect = (data) => {
      this.damListViewModel.damIdsSelected = data
        .map((item) => {
          return item[this.key];
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    handleCreateFolder = () => {
      this.damformModalViewModal.openCreateCollectionModal();
    };

    handleCreateAssets = (data) => {
      if (data) {
        const collectionId = history.location.pathname.split('/');
        const currentCollection = !isNaN(collectionId[collectionId.length - 1])
          ? collectionId[collectionId.length - 1]
          : 0;

        this.damListViewModel.createAssets({
          [DAM_ASSETS_API_FIELD_KEY.NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.FILE_NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.COLLECTION_ID]: currentCollection,
          [DAM_ASSETS_API_FIELD_KEY.FILE]: data,
        });
      }
    };

    _handleList = () => {
      this.damListViewModel.isList = !this.damListViewModel.isList;
    };

    handleDoubleClick = (collection) => {
      if (!collection?.[DAM_ASSETS_FIELD_KEY.TYPE]) {
        history.push(history.location.pathname + '/' + collection.id);
      } else {
        this.damformModalViewModal.damEditdata = {
          ...collection,
        };
        this.damformModalViewModal.openModal();
      }
    };

    handleRightClick = (e) => {
      e.preventDefault();
      const inside = e.target.closest('.item_thumb');
      if (!inside) {
        this.damformModalViewModal.closeContextMenuItem();
        this.damListViewModel.setActionState({
          selectedCards: [],
        });
        const innerHeight = window.innerHeight;
        const innerWidth = window.innerWidth;
        let style = {
          transition: 'none',
          top: e.clientY,
          left: e.clientX,
        };
        if (e.clientX + 200 > innerWidth) {
          style = {
            ...style,
            right: innerWidth - e.clientX,
            left: 'unset',
          };
        }
        if (e.clientY + 260 > innerHeight) {
          style = {
            ...style,
            bottom: innerHeight - e.clientY,
            top: 'unset',
          };
        }

        this.damListViewModel.setActionState({
          style: style,
        });
        this.damformModalViewModal.openContextMenu();
      }
    };

    handleClickOutSite = (e) => {
      e.preventDefault();
      const inside = e.target.closest('.item_thumb');
      const checkChooseAction = e.target.closest('.choose-an-action');
      if (!inside && !checkChooseAction) {
        this.damListViewModel.setActionState({
          selectedCards: [],
        });
      }
    };

    handleRightClickItem = (e, data) => {
      e.preventDefault();
      this.damformModalViewModal.closeContextMenu();
      const innerHeight = window.innerHeight;
      const innerWidth = window.innerWidth;
      let style = {
        transition: 'none',
        top: e.clientY,
        left: e.clientX,
      };
      if (e.clientX + 200 > innerWidth) {
        style = {
          ...style,
          right: innerWidth - e.clientX,
          left: 'unset',
        };
      }
      if (e.clientY + 260 > innerHeight) {
        style = {
          ...style,
          bottom: innerHeight - e.clientY,
          top: 'unset',
        };
      }

      this.damformModalViewModal.damEditdata = {
        ...data,
        style: { ...style },
      };
      this.damListViewModel.setActionState({
        style: style,
      });
      this.handleItemSelection(data.index, false, false, false, true);
      this.damformModalViewModal.openContextMenuItem();
    };

    handleFilter = (data) => {
      const collectionId = history.location.pathname.split('/');
      const currentCollection = !isNaN(collectionId[collectionId.length - 1])
        ? collectionId[collectionId.length - 1]
        : 0;
      this.damListViewModel.goToFolder(currentCollection, {
        'filter[type]': data.value,
      });
    };

    handleSortby = (data) => {
      const collectionId = history.location.pathname.split('/');
      const currentCollection = !isNaN(collectionId[collectionId.length - 1])
        ? collectionId[collectionId.length - 1]
        : 0;
      this.damListViewModel.goToFolder(currentCollection, {
        'list[ordering]': data.value.ordering,
        'list[direction]': data.value.direction,
      });
    };

    clearItemSelection = () => {
      // dispatch({ type: "CLEAR_SELECTION" });
    };

    handleItemSelection = (index, cmdKey, shiftKey, ctrlKey, contextClick = false) => {
      const { assets, collections, isSearch } = this.damListViewModel;

      const collectionId = history.location.pathname.split('/');

      let handleColections = [];
      let handleAssets = [];
      if (!isNaN(+collectionId[collectionId.length - 1])) {
        handleAssets = assets.filter(
          (asset) =>
            +asset[DAM_ASSETS_FIELD_KEY.COLLECTION_ID] === +collectionId[collectionId.length - 1]
        );
        handleColections = collections.filter(
          (collection) =>
            +collection[DAM_COLLECTION_FIELD_KEY.PARENT_ID] ===
            +collectionId[collectionId.length - 1]
        );
      } else {
        if (isSearch) {
          handleAssets = assets;
          handleColections = collections;
        } else {
          handleAssets = assets.filter((asset) => +asset[DAM_ASSETS_FIELD_KEY.COLLECTION_ID] === 0);
          handleColections = collections.filter(
            (collection) => collection[DAM_COLLECTION_FIELD_KEY.PARENT_ID] === 0
          );
        }
      }
      let newSelectedCards;

      const cards = [...handleColections, ...handleAssets];
      const card = index < 0 ? '' : cards[index];
      const newLastSelectedIndex = index;
      if (!cmdKey && !shiftKey && !ctrlKey && !contextClick) {
        newSelectedCards = [card];
      } else if (shiftKey) {
        if (this.damListViewModel.actionState.lastSelectedIndex >= index) {
          newSelectedCards = [].concat.apply(
            this.damListViewModel.actionState.selectedCards,
            cards.slice(index, this.damListViewModel.actionState.lastSelectedIndex)
          );
        } else {
          newSelectedCards = [].concat.apply(
            this.damListViewModel.actionState.selectedCards,
            cards.slice(this.damListViewModel.actionState.lastSelectedIndex + 1, index + 1)
          );
        }
      } else if (cmdKey || ctrlKey) {
        const foundIndex = this.damListViewModel.actionState.selectedCards.findIndex(
          (f) => f.id === card.id
        );
        // If found remove it to unselect it.
        if (foundIndex >= 0) {
          newSelectedCards = [
            ...this.damListViewModel.actionState.selectedCards.slice(0, foundIndex),
            ...this.damListViewModel.actionState.selectedCards.slice(foundIndex + 1),
          ];
        } else {
          newSelectedCards = [...this.damListViewModel.actionState.selectedCards, card];
        }
      } else if (contextClick) {
        const foundIndex = this.damListViewModel.actionState.selectedCards.findIndex(
          (f) => f.id === card.id
        );
        // If found remove it to unselect it.
        if (foundIndex >= 0) {
          newSelectedCards = [...this.damListViewModel.actionState.selectedCards];
        } else {
          newSelectedCards = [card];
        }
      }

      const finalList = cards
        ? cards.filter((f) => newSelectedCards.find((a) => a.id === f.id))
        : [];

      this.damListViewModel.setActionState({
        selectedCards: finalList,
        lastSelectedIndex: newLastSelectedIndex,
      });
    };

    render() {
      const { assets, status, collections, isSearch } = this.damListViewModel;
      const { t } = this.props;

      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      const tableRowHeader = [
        {
          Header: t('txt_name'),
          accessor: DAM_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div
              className={`d-flex  ${this.damListViewModel.isList ? '' : ' justify-content-center'}`}
            >
              {!row.original[DAM_ASSETS_FIELD_KEY.TYPE] &&
              !row.original[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL] ? (
                // folder
                <div
                  className={`${
                    this.damListViewModel.isList
                      ? 'd-flex align-items-center'
                      : 'd-flex flex-column align-items-center justify-content-center'
                  }`}
                >
                  <ComponentImage
                    alt={row.original.name}
                    src="/assets/images/folder.svg"
                    className={this.damListViewModel.isList ? '' : styles.folder}
                  />
                  <span
                    className={
                      this.damListViewModel.isList
                        ? 'ms-3 text-color'
                        : '' + 'text-center text-color'
                    }
                  >
                    {row.original[DAM_COLUMN_INDICATOR.NAME]}
                    <br />
                    {row.original[DAM_COLUMN_INDICATOR.LAST_MODIFIED]}
                  </span>
                </div>
              ) : (
                // file
                <div
                  className={`${
                    this.damListViewModel.isList
                      ? 'd-flex align-items-center'
                      : 'd-flex flex-column align-items-center justify-content-center'
                  }`}
                >
                  <span
                    className={this.damListViewModel.isList ? styles.image_isList : styles.image}
                  >
                    {row.original?.[DAM_ASSETS_FIELD_KEY.TYPE] === 'image' ? (
                      <ComponentImage
                        wrapperClassName="w-100 h-100"
                        className="w-100 h-100 object-fit-cover"
                        src={row.original?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]}
                      />
                    ) : (
                      <ComponentImage
                        wrapperClassName="w-100 h-100 d-flex align-items-center justify-content-center"
                        src={utils.checkFileTypeFormData(row.original)}
                      />
                    )}
                  </span>

                  <span
                    className={
                      this.damListViewModel.isList
                        ? 'ms-3 text-color'
                        : 'w-100 lcl lcl-1 p-2 text-color'
                    }
                  >
                    {row.original[DAM_COLUMN_INDICATOR.NAME]}
                  </span>
                </div>
              )}
            </div>
          ),
        },

        {
          Header: t('txt_size'),
          accessor: DAM_COLUMN_INDICATOR.FILE_SIZE,
          Cell: ({ row }) => (
            <div className="d-flex">
              <span className="">
                {row.original[DAM_ASSETS_FIELD_KEY.TYPE]
                  ? row.original[DAM_ASSETS_FIELD_KEY.FILE_SIZE]
                  : row.original[DAM_COLLECTION_FIELD_KEY.FILE_SIZE]}
                KB
              </span>
            </div>
          ),
        },
        {
          Header: t('txt_owner'),
          accessor: DAM_COLUMN_INDICATOR.OWNER,
        },
        {
          Header: t('txt_last_modified'),
          accessor: DAM_COLUMN_INDICATOR.LAST_MODIFIED,
        },
      ];

      const collectionId = history.location.pathname.split('/');

      let handleColections = [];
      let handleAssets = [];
      if (!isNaN(+collectionId[collectionId.length - 1])) {
        handleAssets = assets.filter(
          (asset) =>
            +asset[DAM_ASSETS_FIELD_KEY.COLLECTION_ID] === +collectionId[collectionId.length - 1]
        );
        handleColections = collections.filter(
          (collection) =>
            +collection[DAM_COLLECTION_FIELD_KEY.PARENT_ID] ===
            +collectionId[collectionId.length - 1]
        );
      } else {
        if (isSearch) {
          handleAssets = assets;
          handleColections = collections;
        } else {
          handleAssets = assets.filter((asset) => +asset[DAM_ASSETS_FIELD_KEY.COLLECTION_ID] === 0);
          handleColections = collections.filter(
            (collection) => collection[DAM_COLLECTION_FIELD_KEY.PARENT_ID] === 0
          );
        }
      }

      return (
        <div
          className="position-relative col d-flex flex-column"
          id="outside"
          onContextMenu={this.handleRightClick}
          onClick={this.handleClickOutSite}
        >
          {handleColections || handleAssets ? (
            <>
              <Table
                rowData={[...handleColections, ...handleAssets]}
                dataCollections={handleColections}
                dataAssets={handleAssets}
                tableRowHeader={tableRowHeader}
                onSelect={this.handleSelect}
                isThumb={true}
                isList={this.damListViewModel.isList}
                dataThumb={[
                  'selection',
                  DAM_COLUMN_INDICATOR.FILE_SIZE,
                  DAM_COLUMN_INDICATOR.OWNER,
                  DAM_COLUMN_INDICATOR.LAST_MODIFIED,
                ]}
                listViewModel={this.damListViewModel}
                hasSubRow={false}
                _handleList={this._handleList}
                view={this.view}
                thumbColumnsNumber={2}
                onDoubleClick={this.handleDoubleClick}
                createFolder={this.handleCreateFolder}
                createAssets={this.handleCreateAssets}
                onFilter={this.handleFilter}
                onSortby={this.handleSortby}
                onRightClickItem={this.handleRightClickItem}
                noSelection={true}
                onSelectionChange={this.handleItemSelection}
                // selectedCards={this.damListViewModel.actionState.selectedCards}
              />
            </>
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title={t('create_your_1st_project')}
              width="w-50"
            />
          )}
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withDamViewModel(HomeList)));
