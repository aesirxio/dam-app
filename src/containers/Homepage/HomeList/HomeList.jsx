/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import '../index.scss';

import { observer } from 'mobx-react';
import { withHomeViewModel } from '../HomeViewModels/HomeViewModelContextProvider';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withTranslation } from 'react-i18next';
import { DAM_COLUMN_INDICATOR } from '../../../constants/DamConstant';
import Table from '../../../components/Table';
import ComponentNoData from '../../../components/ComponentNoData';
import Spinner from '../../../components/Spinner';
import ComponentImage from '../../../components/ComponentImage';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import styles from '../index.module.scss';
import history from 'routes/history';
import { withRouter } from 'react-router-dom';
import { GlobalStore, withGlobalViewModel } from 'store/Store';
import Dropzone from 'components/Dropzone';

const HomeList = observer(
  class HomeList extends Component {
    homeListViewModel = null;
    static contextType = GlobalStore;

    constructor(props) {
      super(props);

      this.state = {};

      const { viewModel } = props;

      this.viewModel = viewModel ? viewModel : null;
      this.homeListViewModel = this.viewModel ? this.viewModel.getHomeListViewModel() : null;
    }

    componentDidMount() {
      const collectionId = history.location.pathname.split('/');
      this.homeListViewModel.gotoFolder(collectionId[2] ?? 0);
    }

    componentWillUnmount() {
      this.homeListViewModel.resetObservableProperties();
    }

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        const collectionId = history.location.pathname.split('/');
        this.homeListViewModel.gotoFolder(collectionId[2] ?? 0);
      }
    }

    handleEdit = (e, row, page) => {
      this.formModalViewModal.loadForm(row[this.key], page);
    };

    handleSelect = (data) => {
      // console.warn(this.listViewModel[`${this.view}IdsSelected`]);
      this.homeListViewModel.damIdsSelected = data
        .map((item) => {
          return item[this.key];
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    handleCreateFolter = () => {};

    _handleList = () => {
      this.homeListViewModel.isList = !this.homeListViewModel.isList;
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
    render() {
      const { tableStatus, assets, pagination } = this.homeListViewModel;
      const { status, collections } = this.context.globalViewModel;
      const { t } = this.props;

      if (status === PAGE_STATUS.LOADING || tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      const tableRowHeader = [
        {
          Header: t('txt_name'),
          accessor: DAM_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row, state }) => (
            <div
              {...row.getToggleRowExpandedProps()}
              className={`d-flex pe-none ${
                this.homeListViewModel.isList ? '' : ' justify-content-center'
              }`}
            >
              {!row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? (
                <div
                  className={`${
                    this.homeListViewModel.isList
                      ? 'd-flex align-items-center'
                      : 'd-flex flex-column align-items-center justify-content-center'
                  }`}
                >
                  <ComponentImage
                    alt={row.original.name}
                    src="/assets/images/folder.svg"
                    className={this.homeListViewModel.isList ? '' : styles.folder}
                  />
                  <span className={this.homeListViewModel.isList ? 'ms-3' : '' + 'text-center'}>
                    {row.original[DAM_COLUMN_INDICATOR.NAME]}
                    <br />
                    {row.original[DAM_COLUMN_INDICATOR.LAST_MODIFIED]}
                  </span>
                </div>
              ) : (
                <div
                  className={`${
                    this.homeListViewModel.isList
                      ? 'd-flex align-items-center'
                      : 'd-flex flex-column align-items-center justify-content-center'
                  }`}
                >
                  <span
                    className={this.homeListViewModel.isList ? styles.image_isList : styles.image}
                  >
                    <ComponentImage
                      alt={row.original.name}
                      src={row.original[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      wrapperClassName="w-100 h-100"
                    />
                  </span>

                  <span className={this.homeListViewModel.isList ? 'ms-3' : ''}>
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
        handleColections = collections.filter(
          (collection) => collection.parent_id === +collectionId[collectionId.length - 1]
        );
        handleAssets = assets.filter(
          (asset) => asset.collection_id === +collectionId[collectionId.length - 1]
        );
      } else {
        handleColections = collections.filter((collection) => collection.parent_id === 0);
        handleAssets = assets.filter((asset) => asset.collection_id === 0);
      }

      return (
        <div
          className="position-relative col d-flex flex-column"
          id="outside"
          onContextMenu={this.handleRightClick}
        >
          {handleColections || handleAssets ? (
            <Table
              rowData={[...handleColections, ...handleAssets]}
              tableRowHeader={tableRowHeader}
              onEdit={this.handleEdit}
              onSelect={this.handleSelect}
              isThumb={true}
              isList={this.homeListViewModel.isList}
              pageSize={this.homeListViewModel.pageSize}
              dataThumb={[
                'selection',
                DAM_COLUMN_INDICATOR.FILE_SIZE,
                DAM_COLUMN_INDICATOR.OWNER,
                DAM_COLUMN_INDICATOR.LAST_MODIFIED,
              ]}
              pagination={pagination}
              listViewModel={this.homeListViewModel}
              searchFunction={this.homeListViewModel.searchProjects}
              searchText={t('search_your_project')}
              hasSubRow={false}
              _handleList={this._handleList}
              view={this.view}
              thumbColumnsNumber={2}
              onDoubleClick={this.handleDoubleClick}
            />
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

export default withTranslation('common')(withRouter(withHomeViewModel(HomeList)));
