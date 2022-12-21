/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import history from '../../../routes/history';

import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { DAM_ASSETS_API_FIELD_KEY } from 'aesirx-dma-lib';
import Dropzone from 'components/Dropzone';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import HomeFormModal from './HomeFormModel';
import { Link, withRouter } from 'react-router-dom';
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

    componentDidUpdate() {}

    handleCreateFolder = () => {
      this.damformModalViewModal.openCreateCollectionModal();
    };

    handleCreateAssets = (data) => {
      if (data) {
        const collectionId = history.location.pathname.split('/');
        const checkCollection = !isNaN(collectionId[collectionId.length - 1]);

        this.damListViewModel.createAssets({
          [DAM_ASSETS_API_FIELD_KEY.COLLECTION_ID]: checkCollection
            ? collectionId[collectionId.length - 1]
            : 0,
          [DAM_ASSETS_API_FIELD_KEY.FILE]: data,
        });
      }
    };

    handleLinkBreadCrumb = (id) => {
      const currentLink = history.location.pathname.split('/');

      const currentLinkIndexMap = currentLink.findIndex((a) => +a === id);

      return currentLink.splice(0, currentLinkIndexMap + 1).join('/');
    };

    render() {
      const { t } = this.props;
      const collectionId = history.location.pathname.split('/');
      const breadcrumb = collectionId.map((id, index) => {
        if (!isNaN(id) && index !== 0) {
          return this.damListViewModel.collections.find((collection) => +collection.id === +id);
        }
      });
      return (
        <>
          <h2 className="text-gray-900 fw-bold">
            <span>
              <Link className="text-body" to="/root">
                {t('txt_your_digital_assets')}
              </Link>
            </span>
            {breadcrumb
              ? breadcrumb.map((_breadcrumb) => {
                  if (_breadcrumb) {
                    return _breadcrumb?.name ? (
                      <span key={_breadcrumb?.id}>
                        <FontAwesomeIcon
                          size={'1x'}
                          className="text-green  px-2"
                          icon={faAngleRight}
                        />
                        <Link className="text-body" to={this.handleLinkBreadCrumb(_breadcrumb?.id)}>
                          {_breadcrumb.name}
                        </Link>
                      </span>
                    ) : (
                      ''
                    );
                  }
                  return;
                })
              : null}
          </h2>
          <div className="d-flex justify-content-end">
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
