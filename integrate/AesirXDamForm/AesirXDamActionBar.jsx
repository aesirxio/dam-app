/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import history from 'routes/history';

import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { DAM_ASSETS_API_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';
import Dropzone from 'components/Dropzone';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import ButtonNormal from 'components/ButtonNormal';
import AesirXDamFormModel from './AesirXDamFormModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

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
          <h2 className="text-blue-0">
            <span>{t('txt_your_digital_assets')}</span>
            {breadcrumb
              ? breadcrumb.map((_breadcrumb) => {
                  if (_breadcrumb) {
                    return _breadcrumb?.name ? (
                      <span key={_breadcrumb?.id}>
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
            <Dropzone noDrag={true} createAssets={this.handleCreateAssets} className="me-3">
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
            <AesirXDamFormModel />
          </div>
        </>
      );
    }
  }
);
export default withTranslation('common')(withDamViewModel(AesirXDamActionBar));
