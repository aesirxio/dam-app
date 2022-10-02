/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import '../index.scss';

import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_API_RESPONSE_FIELD_KEY,
} from 'aesirx-dma-lib/src/Constant/DamConstant';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import history from 'routes/history';
import ComponentImage from '../../../components/ComponentImage';
import ComponentNoData from '../../../components/ComponentNoData';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';
import { DAM_COLUMN_INDICATOR } from '../../../constants/DamConstant';
import PAGE_STATUS from '../../../constants/PageStatus';
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
      this.damListViewModel = this.viewModel ? this.viewModel.damListViewModel : null;
      this.damformModalViewModal = this.viewModel ? this.viewModel.damFormViewModel : null;
    }

    async componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
      const collectionId = history.location.pathname.split('/');
      this.damListViewModel.getAssets(collectionId[collectionId.length - 1] ?? 0);
      this.damListViewModel.getCollections(collectionId[collectionId.length - 1] ?? 0);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        const collectionId = history.location.pathname.split('/');
        this.damListViewModel.getAssets(collectionId[collectionId.length - 1] ?? 0);
        this.damListViewModel.getCollections(collectionId[collectionId.length - 1] ?? 0);
      }
    }

    handleClickOutside = (e) => {
      const checkContextMenu = e.target.closest('#contextMenu');
      if (checkContextMenu) {
        return;
      } else {
        if (!document.querySelector('.main-content').classList.contains('overflow-y-auto')) {
          document.querySelector('.main-content').classList.add('overflow-y-auto');
        }
        this.damformModalViewModal.closeContextMenu();
      }
    };

    handleSelect = (data) => {
      // console.warn(this.listViewModel[`${this.view}IdsSelected`]);
      this.damListViewModel.damIdsSelected = data
        .map((item) => {
          return item[this.key];
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    handleCreateFolder = (data) => {
      const collectionId = history.location.pathname.split('/');
      this.damListViewModel.createCollections({
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.NAME]: 'New Folder',
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.PARENT_ID]:
          collectionId[collectionId.length - 1] ?? 0,
      });
    };

    handleCreateAssets = (data) => {
      if (data) {
        const collectionId = history.location.pathname.split('/');
        this.damListViewModel.createAssets({
          [DAM_ASSETS_API_FIELD_KEY.NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.FILE_NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.COLLECTION_ID]: collectionId[collectionId.length - 1] ?? 0,
          [DAM_ASSETS_API_FIELD_KEY.FILE]: data,
        });
      }
    };

    _handleList = () => {
      this.damListViewModel.isList = !this.damListViewModel.isList;
    };

    handleDoubleClick = (colectionId) => {
      history.push('/root/' + colectionId);
    };

    handleRightClick = (e) => {
      e.preventDefault();
      const inside = e.target.closest('.col_thumb');
      if (!inside) {
        console.log(e);
      }
    };

    handleRightClickItem = (e, data) => {
      e.preventDefault();
      if (document.querySelector('.main-content').classList.contains('overflow-y-auto')) {
        document.querySelector('.main-content').classList.remove('overflow-y-auto');
      }
      this.damformModalViewModal.damEditdata = {
        ...data,
        x: e.clientX,
        y: e.clientY,
      };
      this.damformModalViewModal.openContextMenu();
    };

    handleFilter = (data) => {
      const collectionId = history.location.pathname.split('/');
      this.damListViewModel.filterAssets(collectionId[collectionId.length - 1] ?? 0, {
        'filter[type]': data.value,
      });
    };

    handleSortby = (data) => {
      const collectionId = history.location.pathname.split('/');
      this.damListViewModel.filterAssets(collectionId[collectionId.length - 1] ?? 0, {
        'list[ordering]': data.value.ordering,
        'list[direction]': data.value.direction,
      });
    };

    render() {
      const { assets, status, collections, isSearch } = this.viewModel.damListViewModel;
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
              {...row.getToggleRowExpandedProps()}
              className={`d-flex pe-none ${
                this.damListViewModel.isList ? '' : ' justify-content-center'
              }`}
            >
              {!row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? (
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
                  <span className={this.damListViewModel.isList ? 'ms-3' : '' + 'text-center'}>
                    {row.original[DAM_COLUMN_INDICATOR.NAME]}
                    <br />
                    {row.original[DAM_COLUMN_INDICATOR.LAST_MODIFIED]}
                  </span>
                </div>
              ) : (
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
                    {/* <ComponentImage
                      alt={row.original.name}
                      src={row.original[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      wrapperClassName="w-100 h-100"
                    /> */}
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

                  <span className={this.damListViewModel.isList ? 'ms-3' : 'w-100 lcl lcl-1'}>
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
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <span className="">{row.original[DAM_ASSETS_FIELD_KEY.FILE_SIZE] ?? 0} KB</span>
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
          (asset) => asset.collection_id === +collectionId[collectionId.length - 1]
        );
        handleColections = collections.filter(
          (collection) => collection.parent_id === +collectionId[collectionId.length - 1]
        );
      } else {
        if (isSearch) {
          handleAssets = assets;
          handleColections = collections;
        } else {
          handleAssets = assets.filter((asset) => asset.collection_id === 0);
          handleColections = collections.filter((collection) => collection.parent_id === 0);
        }
      }
      return (
        <div
          className="position-relative col d-flex flex-column"
          id="outside"
          onContextMenu={this.handleRightClick}
        >
          {handleColections || handleAssets ? (
            <>
              <Table
                rowData={[...handleColections, ...handleAssets]}
                tableRowHeader={tableRowHeader}
                onSelect={this.handleSelect}
                isThumb={true}
                isList={this.damListViewModel.isList}
                pageSize={this.damListViewModel.pageSize}
                dataThumb={[
                  'selection',
                  DAM_COLUMN_INDICATOR.FILE_SIZE,
                  DAM_COLUMN_INDICATOR.OWNER,
                  DAM_COLUMN_INDICATOR.LAST_MODIFIED,
                ]}
                // pagination={pagination}
                listViewModel={this.damListViewModel}
                // searchFunction={this.damListViewModel.searchProjects}
                // searchText={t('search_your_project')}
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
