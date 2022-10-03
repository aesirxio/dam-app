/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import history from '../../../routes/history';

import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_COLLECTION_API_RESPONSE_FIELD_KEY,
} from 'aesirx-dma-lib/src/Constant/DamConstant';
import Dropzone from 'components/Dropzone';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import HomeFormModal from './HomeFormModel';
const HomeActionBar = observer(
  class HomeActionBar extends Component {
    damFormModalViewModel = null;
    damListViewModel = null;
    openModal = false;

    constructor(props) {
      super(props);
      const { viewModel } = props;

      this.damListViewModel = viewModel ? viewModel.damListViewModel : null;
    }

    componentDidMount() {}

    handleCreateFolder = () => {
      const collectionId = history.location.pathname.split('/');
      this.damListViewModel.createCollections({
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.NAME]: 'New Folder',
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.PARENT_ID]: collectionId[2] ?? 0,
      });
    };
    handleCreateAssets = (data) => {
      if (data) {
        const collectionId = history.location.pathname.split('/');
        this.damListViewModel.createAssets({
          [DAM_ASSETS_API_FIELD_KEY.NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.FILE_NAME]: data?.name ?? '',
          [DAM_ASSETS_API_FIELD_KEY.COLLECTION_ID]: collectionId[2] ?? 0,
          [DAM_ASSETS_API_FIELD_KEY.FILE]: data,
        });
      }
    };
    render() {
      const { t } = this.props;

      return (
        <div className="d-flex justify-content-end">
          <Dropzone createAssets={this.handleCreateAssets} className="me-3">
            <ButtonNormal
              onClick={() => {}}
              iconStart={faPlus}
              text={t('txt_upload_file')}
              className=" btn-success"
            />
          </Dropzone>
          <ButtonNormal
            onClick={this.handleCreateFolder}
            iconStart={faFolder}
            text="txt_create_folder"
            className="btn-outline-gray-300 text-blue-0"
          />
          <HomeFormModal />
        </div>
      );
    }
  }
);
export default withTranslation('common')(withDamViewModel(HomeActionBar));
