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
const HomeList = observer(
  class HomeList extends Component {
    homeListViewModel = null;
    constructor(props) {
      super(props);

      this.state = {};

      const { viewModel } = props;

      this.viewModel = viewModel ? viewModel : null;
      this.homeListViewModel = this.viewModel ? this.viewModel.getHomeListViewModel() : null;
    }

    componentDidMount() {
      this.homeListViewModel.initializeData();
    }
    componentWillUnmount() {
      this.homeListViewModel.resetObservableProperties();
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
    handleExpanded = (e, row) => {
      this.homeListViewModel.getContentByIdExpanded(row[this.key]);
    };

    _handleList = () => {
      this.homeListViewModel.isList = !this.homeListViewModel.isList;
    };

    render() {
      const { tableStatus, assets, collections, pagination } = this.homeListViewModel;
      const { t } = this.props;
      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      const tableRowHeader = [
        {
          Header: t('txt_name'),
          accessor: DAM_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row, state }) => (
            <div
              {...row.getToggleRowExpandedProps()}
              className={`d-flex ${this.homeListViewModel.isList ? '' : ' justify-content-center'}`}
            >
              {!row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? (
                <div
                  className={`${
                    this.homeListViewModel.isList
                      ? 'd-flex align-items-center'
                      : 'd-flex flex-column align-items-center justify-content-center'
                  }`}
                >
                  <FontAwesomeIcon
                    color="#3F8EFC"
                    style={{ width: '45px', height: '37px' }}
                    icon={faFolder}
                    className={this.homeListViewModel.isList ? '' : styles.folder}
                  />
                  <span className={this.homeListViewModel.isList ? 'ms-3' : ''}>
                    {row.original[DAM_COLUMN_INDICATOR.NAME]}
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
                  <span className={this.homeListViewModel.isList ? '' : styles.folder}>
                    <ComponentImage
                      width={56}
                      height={56}
                      alt={row.original.name}
                      src={row.original[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]}
                      style={{ objectFit: 'cover' }}
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
      return (
        <>
          {collections || assets ? (
            <Table
              rowData={[...collections, ...assets]}
              tableRowHeader={tableRowHeader}
              onEdit={this.handleEdit}
              onSelect={this.handleSelect}
              isThumb={true}
              isList={this.homeListViewModel.isList}
              pageSize={this.homeListViewModel.pageSize}
              dataThumb={['selection', DAM_COLUMN_INDICATOR.FILE_SIZE]}
              pagination={pagination}
              listViewModel={this.homeListViewModel}
              searchFunction={this.homeListViewModel.searchProjects}
              searchText={t('search_your_project')}
              hasSubRow={false}
              _handleList={this._handleList}
              view={this.view}
              thumbColumnsNumber={2}
            />
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title={t('create_your_1st_project')}
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withTranslation('common')(withHomeViewModel(HomeList));
