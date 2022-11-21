/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import history from '../../../routes/history';

import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { DAM_ASSETS_API_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';
import Dropzone from 'components/Dropzone';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import HomeFormModal from './HomeFormModel';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

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
      this.damListViewModel = viewModel ? viewModel.damListViewModel : null;
      this.damformModalViewModal = viewModel ? viewModel.damFormViewModel : null;
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        const collectionId = history.location.pathname.split('/');
        // this.damListViewModel.getCollections(collectionId[collectionId.length - 1] ?? 0);
        const breadcrumb = collectionId.map((id, index) => {
          if (!isNaN(id) && index !== 0) {
            return this.damListViewModel.collections.find((collection) => +collection.id === +id);
          }
        });
        this.setState({
          breadcrumb: breadcrumb ?? [],
        });
      }
    }

    handleCreateFolder = () => {
      this.damformModalViewModal.openCreateCollectionModal();
    };

    handleCreateAssets = (data) => {
      if (data) {
        const collectionId = history.location.pathname.split('/');
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

      return (
        <>
          <h2 className="text-gray-900 fw-bold">
            <span>{t('txt_your_digital_assets')}</span>
            {this.state.breadcrumb
              ? this.state.breadcrumb.map((_breadcrumb) => {
                  if (_breadcrumb) {
                    return _breadcrumb?.name ? (
                      <span key={_breadcrumb?.id}>
                        <FontAwesomeIcon
                          size={'1x'}
                          className="text-green  px-2"
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
              className="btn-outline-gray-300 text-blue-0 me-3 "
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
