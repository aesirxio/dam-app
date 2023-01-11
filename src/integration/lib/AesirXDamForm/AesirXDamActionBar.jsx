/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { DAM_ASSETS_API_FIELD_KEY } from 'aesirx-dma-lib';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

const AesirXDamFormModel = React.lazy(() => import('./AesirXDamFormModel'));
const ButtonNormal = React.lazy(() => import('components/ButtonNormal'));
const Dropzone = React.lazy(() => import('components/Dropzone'));
const AesirXDamActionBar = observer(
  class AesirXDamActionBar extends Component {
    damFormModalViewModel = null;
    damListViewModel = null;
    openModal = false;

    constructor(props) {
      super(props);
      const { viewModel } = props;

      this.damListViewModel = viewModel ? viewModel.damListViewModel : null;
      this.damformModalViewModal = viewModel ? viewModel.damFormViewModel : null;
    }

    componentDidMount() {}

    handleCreateFolder = () => {
      this.damformModalViewModal.openCreateCollectionModal();
    };

    handleCreateAssets = (data) => {
      if (data) {
        const collectionId = this.damListViewModel.damLinkFolder.split('/');
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

    handleLinkBreadCrumb = (link = '/root') => {
      if (link === 'root') {
        this.damListViewModel.setDamLinkFolder(link);
      } else {
        const currentLink = this.damListViewModel.damLinkFolder.split('/');

        const currentLinkIndexMap = currentLink.findIndex((a) => +a === link);

        const linkFolder = currentLink.splice(0, currentLinkIndexMap + 1).join('/');
        if (linkFolder !== this.damListViewModel.damLinkFolder) {
          this.damListViewModel.setDamLinkFolder(linkFolder);
        }
      }
    };

    render() {
      const { t } = this.props;
      const collectionId = this.damListViewModel.damLinkFolder.split('/');

      const breadcrumb = collectionId.map((id, index) => {
        if (!isNaN(id) && index !== 0) {
          return this.damListViewModel.collections.find((collection) => +collection.id === +id);
        }
      });
      return (
        <>
          <h2 className="text-gray-900 fw-bold">
            <span className="text-body cursor-pointer" onClick={this.handleLinkBreadCrumb}>
              {t('txt_digital_assets_media')}
            </span>
            {breadcrumb
              ? breadcrumb.map((_breadcrumb) => {
                  if (_breadcrumb) {
                    return _breadcrumb?.name ? (
                      <span
                        className="text-body cursor-pointer"
                        onClick={() => this.handleLinkBreadCrumb(_breadcrumb?.id)}
                        key={_breadcrumb?.id}
                      >
                        <FontAwesomeIcon
                          size={'1x'}
                          className="text-green text-color px-2"
                          icon={faAngleRight}
                        />
                        {_breadcrumb.name}
                      </span>
                    ) : (
                      ''
                    );
                  }
                })
              : null}
          </h2>
          <div className="d-flex justify-content-end">
            <ButtonNormal
              onClick={this.handleCreateFolder}
              iconStart={faFolder}
              text="txt_create_folder"
              className="btn-outline-gray-300 text-blue-0 me-3"
            />
            <Dropzone noDrag={true} createAssets={this.handleCreateAssets}>
              <ButtonNormal
                onClick={() => {}}
                iconStart={faPlus}
                text={t('txt_upload_file')}
                className=" btn-success"
              />
            </Dropzone>
            <AesirXDamFormModel />
          </div>
        </>
      );
    }
  }
);
export default withTranslation('common')(withDamViewModel(AesirXDamActionBar));
