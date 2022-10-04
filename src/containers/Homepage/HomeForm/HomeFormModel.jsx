/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';
import ComponentImage from 'components/ComponentImage';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import HomeForm from './HomeForm';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import {
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-dma-lib/src/Constant/DamConstant';

const ModalComponent = lazy(() => import('../../../components/Modal'));

const HomeFormModal = observer(
  class HomeFormModal extends Component {
    damFormModalViewModel = null;
    damListViewModel = null;
    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;
      this.damFormModalViewModel = viewModel ? viewModel.damFormViewModel : null;
      this.damListViewModel = viewModel ? viewModel.damListViewModel : null;
    }

    updateDetail = () => {
      if (this.isFormValid()) {
        this.damFormModalViewModel.saveOnModal();
      }
    };

    isFormValid = () => {
      if (this.validator.allValid()) {
        return true;
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        return false;
      }
    };

    handleDelete = () => {
      this.damFormModalViewModel.closeModal();
      this.damFormModalViewModel.closeDeleteModal();
      if (this.damFormModalViewModel.damEditdata?.type) {
        this.damListViewModel.deleteAssets(this.damFormModalViewModel.damEditdata);
      } else {
        this.damListViewModel.deleteCollections(this.damFormModalViewModel.damEditdata);
      }
    };

    handleUpdate = (data) => {
      this.damFormModalViewModel.closeModal();
      if (this.damFormModalViewModel.damEditdata?.type) {
        this.damListViewModel.updateAssets({
          [DAM_ASSETS_FIELD_KEY.ID]:
            this.damFormModalViewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.ID],
          ...data,
        });
      } else {
        this.damListViewModel.updateCollections({
          [DAM_COLLECTION_FIELD_KEY.ID]:
            this.damFormModalViewModel.damEditdata?.[DAM_COLLECTION_FIELD_KEY.ID],
          [DAM_COLLECTION_FIELD_KEY.PARENT_ID]:
            this.damFormModalViewModel.damEditdata?.[DAM_COLLECTION_FIELD_KEY.PARENT_ID],

          ...data,
        });
      }
    };

    render() {
      const { show, showDeleteModal, showContextMenu, openModal, downloadFile } =
        this.damFormModalViewModel;
      const { t } = this.props;
      return (
        <>
          <div
            id="contextMenu"
            className={`d-flex align-items-center justify-content-center bg-white shadow-sm rounded-2 flex-column zindex-5 position-fixed cursor-pointer ${
              showContextMenu ? '' : 'd-none'
            }`}
            style={{
              top: this.damFormModalViewModel.damEditdata?.y ?? 0,
              left: this.damFormModalViewModel.damEditdata?.x ?? 0,
              transition: 'none',
            }}
          >
            <div
              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
              onClick={openModal}
            >
              <FontAwesomeIcon icon={faEye} className=" d-inline-block align-text-bottom" />

              <span className="ms-3 text py-1 d-inline-block">{t('txt_preview')}</span>
            </div>
            <div
              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
            >
              <ComponentImage src="/assets/images/move-to-folder.svg" />
              <span className="ms-3 text py-1 d-inline-block">{t('txt_move_to_folder')}</span>
            </div>
            <div
              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
              onClick={downloadFile}
            >
              <ComponentImage src="/assets/images/download.svg" />

              <span className="ms-3 text py-1 d-inline-block">{t('txt_download_folder')}</span>
            </div>
            <div
              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
              onClick={this.damFormModalViewModel.openDeleteModal}
            >
              <FontAwesomeIcon icon={faTrashAlt} className=" d-inline-block align-text-bottom" />
              <span className="ms-3 text py-1 d-inline-block">{t('txt_delete')}</span>
            </div>
          </div>
          <ModalComponent
            show={show}
            onHide={this.damFormModalViewModel.closeModal}
            onShow={this.damFormModalViewModel.closeContextMenu}
            body={
              <HomeForm
                delete={this.handleDelete}
                handleUpdate={this.handleUpdate}
                viewModel={this.damFormModalViewModel}
                validator={this.validator}
              />
            }
            dialogClassName={'mh-80vh mw-80 home-modal'}
          />

          <ModalComponent
            show={showDeleteModal}
            onHide={this.damFormModalViewModel.closeDeleteModal}
            onShow={this.damFormModalViewModel.closeContextMenu}
            body={
              <div className="d-flex flex-column justify-content-center align-items-center pb-5">
                <ComponentImage className="mb-3" src="/assets/images/ep_circle-close.png" />
                <h4 className="mb-4">{t('txt_are_you_sure')}</h4>
                <p className="text-center">
                  {this.damFormModalViewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE]
                    ? t('txt_delete_assets_popup_desc')
                    : t('txt_delete_collections_popup_desc')}
                </p>
                <div className="row">
                  <div className="col-auto">
                    <Button
                      text={t('txt_cancle')}
                      onClick={this.damFormModalViewModel.closeDeleteModal}
                      className="btn btn-outline-white border "
                    />
                  </div>
                  <div className="col-auto">
                    <Button
                      text={t('txt_yes_delete')}
                      onClick={this.handleDelete}
                      className="btn btn-danger "
                    />
                  </div>
                </div>
              </div>
            }
          />
        </>
      );
    }
  }
);

export default withTranslation('common')(withDamViewModel(HomeFormModal));
