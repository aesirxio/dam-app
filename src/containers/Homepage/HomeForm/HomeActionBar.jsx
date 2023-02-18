/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import history from '../../../routes/history';

import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { DAM_ASSETS_API_FIELD_KEY, DAM_COLLECTION_API_RESPONSE_FIELD_KEY } from 'aesirx-dma-lib';
import Dropzone from 'components/Dropzone';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import HomeFormModal from './HomeFormModel';
import BreadCrumbs from 'components/Breadcrumbs';
import { withRouter } from 'react-router-dom';
const HomeActionBar = observer(
  class HomeActionBar extends Component {
    damFormModalViewModel = null;
    damListViewModel = null;
    openModal = false;

    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.state = {
        breadcrumb: [],
      };
      this.damListViewModel = viewModel ? viewModel.getDamListViewModel() : null;
      this.damformModalViewModal = viewModel ? viewModel.getDamFormViewModel() : null;
    }

    handleCreateFolder = () => {
      const { t } = this.props;
      const collectionId = history.location.pathname.split('/');
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

    handleLinkBreadCrumb = (id) => {
      const currentLink = history.location.pathname.split('/');

      const currentLinkIndexMap = currentLink.findIndex((a) => +a === id);

      const linkToPush = currentLink.splice(0, currentLinkIndexMap + 1).join('/');
      history.push(linkToPush);
    };

    render() {
      const { t } = this.props;
      const collectionId = history.location.pathname.split('/');

      const breadcrumb =
        collectionId
          .map((id) => {
            if (!isNaN(id)) {
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
              className="btn-outline-gray-300 bg-white text-blue-0 me-3"
            />
            <Dropzone noDrag={true} createAssets={this.handleCreateAssets}>
              <ButtonNormal
                onClick={() => {}}
                iconStart={faPlus}
                text={t('txt_upload_file')}
                className=" btn-success"
              />
            </Dropzone>
            <HomeFormModal />
          </div>
        </>
      );
    }
  }
);
export default withTranslation('common')(withRouter(withDamViewModel(HomeActionBar)));
