/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { DAM_ASSETS_API_FIELD_KEY, DAM_COLLECTION_API_RESPONSE_FIELD_KEY } from 'aesirx-lib';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import BreadCrumbs from 'components/Breadcrumbs';
import { ButtonNormal } from 'aesirx-uikit';

import Dropzone from 'components/Dropzone';
import AesirXDamFormModel from './AesirXDamFormModel';
const AesirXDamActionBar = observer(
  class AesirXDamActionBar extends Component {
    damFormModalViewModel = null;
    damListViewModel = null;
    openModal = false;
    accept = '*';

    constructor(props) {
      super(props);
      const { viewModel, accept } = props;

      this.damListViewModel = viewModel ? viewModel.getDamListViewModel() : null;
      this.damFormModalViewModal = viewModel ? viewModel.getDamFormViewModel() : null;
      this.accept = accept ?? '*';
    }

    componentDidMount() {}

    handleCreateFolder = () => {
      const { t } = this.props;
      const collectionId = this.damListViewModel.damLinkFolder.split('/');
      const currentCollection = !isNaN(collectionId[collectionId.length - 1])
        ? collectionId[collectionId.length - 1]
        : 0;
      this.damListViewModel.createCollections({
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.NAME]: t('txt_new_folder'),
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.PARENT_ID]: currentCollection,
      });
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

      const breadcrumb =
        collectionId
          .map((id, index) => {
            if (!isNaN(id) && index !== 0) {
              return this.damListViewModel.collections.find((collection) => +collection.id === +id);
            }
          })
          .filter((item) => (item ? true : false)) ?? [];
      return (
        <>
          <BreadCrumbs handleLink={this.handleLinkBreadCrumb} data={breadcrumb} />
          <div className="d-flex justify-content-end col-auto">
            <ButtonNormal
              onClick={this.handleCreateFolder}
              iconStart={faFolder}
              text="txt_create_folder"
              className="btn-outline-gray-300 bg-white text-body border-1 me-3"
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
export default withTranslation()(withDamViewModel(AesirXDamActionBar));
