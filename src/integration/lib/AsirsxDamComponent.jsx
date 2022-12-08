/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-dma-lib';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import ComponentImage from 'components/ComponentImage';
import ComponentNoData from 'components/ComponentNoData';
import Spinner from 'components/Spinner';
import Table from 'components/Table';
import { DAM_COLUMN_INDICATOR } from 'constants/DamConstant';
import PAGE_STATUS from 'constants/PageStatus';
import styles from './index.module.scss';
import utils from './AesirXDamUtils/AesirXDamUtils';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';

const Folder = React.lazy(() => import('SVG/Folder'));
const AesirXDamComponent = observer(
  class AesirXDamComponent extends Component {
    damListViewModel = null;
    damformModalViewModal = null;

    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.damListViewModel = this.viewModel ? this.viewModel.damListViewModel : null;
      this.damformModalViewModal = this.viewModel ? this.viewModel.damFormViewModel : null;
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
      const collectionId = this.damListViewModel.damLinkFolder.split('/');
      this.damListViewModel.getAssets(collectionId[collectionId.length - 1] ?? 0);
      this.damListViewModel.getAllCollections();
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
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
        const collectionId = this.damListViewModel.damLinkFolder.split('/');
        const checkCollection = !isNaN(collectionId[collectionId.length - 1]);

        this.damListViewModel.createAssets({
          [DAM_ASSETS_API_FIELD_KEY.NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.FILE_NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.COLLECTION_ID]: checkCollection
            ? collectionId[collectionId.length - 1]
            : 0,
          [DAM_ASSETS_API_FIELD_KEY.FILE]: data,
        });
      }
    };

    _handleList = () => {
      this.damListViewModel.isList = !this.damListViewModel.isList;
    };

    handleDoubleClick = (collection) => {
      if (!collection?.[DAM_ASSETS_FIELD_KEY.TYPE]) {
        this.damListViewModel.setDamLinkFolder(
          this.damListViewModel.damLinkFolder + '/' + collection.id
        );
      } else {
        const data = [
          {
            id: collection?.[DAM_ASSETS_FIELD_KEY.ID],
            url: collection?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
            extension: collection?.[DAM_ASSETS_FIELD_KEY.FILE_EXTENTION],
            basename: collection?.[DAM_ASSETS_FIELD_KEY.NAME],
          },
        ];
        if (this.props.onSelect) {
          return this.props.onSelect(data);
        } else return data;
      }
    };

    handleRightClick = (e) => {
      e.preventDefault();

      const inside = e.target.closest('.col_thumb');
      if (!inside) {
        this.damformModalViewModal.closeContextMenuItem();

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
          style: { ...style },
        };
        this.damformModalViewModal.openContextMenu();
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
      this.damformModalViewModal.openContextMenuItem();
    };

    handleFilter = (data) => {
      const collectionId = this.damListViewModel.damLinkFolder.split('/');
      this.damListViewModel.filterAssets(collectionId[collectionId.length - 1] ?? 0, {
        'filter[type]': data.value,
      });
    };

    handleSortby = (data) => {
      const collectionId = this.damListViewModel.damLinkFolder.split('/');
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
              className={`d-flex w-100 ${
                this.damListViewModel.isList ? '' : 'justify-content-center'
              }`}
            >
              {!row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? (
                // folder
                <div
                  className={`w-100 ${
                    this.damListViewModel.isList
                      ? 'd-flex align-items-center'
                      : 'd-flex flex-column align-items-center justify-content-center'
                  }`}
                >
                  <div className={this.damListViewModel.isList ? '' : styles.folder}>
                    <Folder />
                  </div>
                  <span
                    title={row.original[DAM_COLUMN_INDICATOR.NAME]}
                    className={
                      this.damListViewModel.isList
                        ? 'ms-3 text-color'
                        : 'text-center text-color lcl lcl-2 w-100 d-block w-space'
                    }
                  >
                    {row.original[DAM_COLUMN_INDICATOR.NAME]}
                  </span>
                  <br />

                  <span>{row.original[DAM_COLUMN_INDICATOR.LAST_MODIFIED]}</span>
                </div>
              ) : (
                // file
                <div
                  className={`w-100 ${
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
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                        {utils.checkFileTypeFormData(row.original)}
                      </div>
                    )}
                  </span>

                  <span
                    title={row.original[DAM_COLUMN_INDICATOR.NAME]}
                    className={
                      this.damListViewModel.isList
                        ? 'ms-3 text-color'
                        : 'd-block w-100 lcl lcl-1 p-2 text-color w-space'
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

      const collectionId = this.damListViewModel.damLinkFolder.split('/');

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

export default withTranslation('common')(withDamViewModel(AesirXDamComponent));
