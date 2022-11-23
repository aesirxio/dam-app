/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';

import Button from 'components/Button';
import ComponentImage from 'components/ComponentImage';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import AesirXDamForm from './AesirXDamForm';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import {
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_API_RESPONSE_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-dma-lib/src/Constant/DamConstant';
import CollectionForm from './CollectionForm';
import history from 'routes/history';

import ModalComponent from 'components/Modal';
import EditingIcon from 'SVG/EddingIcon';
import MoveFolderIcon from 'SVG/MoveFolderIcon';
import PreviewIcon from 'SVG/EyeIcon';
import DownLoadIcon from 'SVG/DownloadIcon';
import DeleteIcon from 'SVG/TrashIcon';

const AesirXDamFormModal = observer(
  class AesirXDamFormModal extends Component {
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

    handleRename = (name) => {
      this.damFormModalViewModel.closeUpdateCollectionModal();
      if (this.damFormModalViewModel.damEditdata?.type) {
        this.damListViewModel.updateAssets({
          ...this.damFormModalViewModel.damEditdata,
          [DAM_ASSETS_FIELD_KEY.NAME]: name,
        });
      } else {
        this.damListViewModel.updateCollections({
          ...this.damFormModalViewModel.damEditdata,
          [DAM_COLLECTION_FIELD_KEY.NAME]: name,
        });
      }
    };

    handleCreateFolder = (name) => {
      const collectionId = this.damListViewModel.damLinkFolder.split('/');
      const checkCollection = !isNaN(collectionId[collectionId.length - 1]);
      this.damListViewModel.createCollections({
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.NAME]: name,
        [DAM_COLLECTION_API_RESPONSE_FIELD_KEY.PARENT_ID]: checkCollection
          ? collectionId[collectionId.length - 1]
          : 0,
      });
      this.damFormModalViewModel.closeCreateCollectionModal();
    };

    render() {
      const {
        show,
        showDeleteModal,
        showContextMenu,
        openModal,
        openUpdateCollectionModal,
        downloadFile,
        showCreateCollectionModal,
        showUpdateModal,
      } = this.damFormModalViewModel;
      const { t } = this.props;
      return (
        <>
          {showContextMenu ? (
            <div
              id="contextMenu"
              className={`d-flex align-items-center justify-content-center bg-white shadow-sm rounded-2 flex-column zindex-5 position-fixed cursor-pointer`}
              style={{ ...this.damFormModalViewModel.damEditdata?.style }}
            >
              <div
                className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
                onClick={openModal}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <PreviewIcon />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block">{t('txt_preview')}</span>
              </div>
              <div
                className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
                onClick={openUpdateCollectionModal}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <EditingIcon />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block">{t('txt_rename')}</span>
              </div>
              <div
                className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <MoveFolderIcon />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block">
                  {t('txt_move_to_folder')}
                </span>
              </div>
              <div
                className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
                onClick={downloadFile}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <DownLoadIcon />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block">
                  {t('txt_download_folder')}
                </span>
              </div>
              <div
                className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
                onClick={this.damFormModalViewModel.openDeleteModal}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <DeleteIcon />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block text-danger">
                  {t('txt_delete')}
                </span>
              </div>
            </div>
          ) : null}

          {show ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ModalComponent
                show={show}
                onHide={this.damFormModalViewModel.closeModal}
                onShow={this.damFormModalViewModel.closeContextMenu}
                body={
                  <AesirXDamForm
                    delete={this.handleDelete}
                    handleUpdate={this.handleUpdate}
                    viewModel={this.damFormModalViewModel}
                    validator={this.validator}
                  />
                }
                dialogClassName={'mh-80vh mw-80 home-modal'}
              />
            </Suspense>
          ) : null}

          {showCreateCollectionModal ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ModalComponent
                show={showCreateCollectionModal}
                onHide={this.damFormModalViewModel.closeCreateCollectionModal}
                onShow={this.damFormModalViewModel.closeContextMenu}
                header={t('txt_new_folder')}
                body={
                  <CollectionForm
                    onSubmit={this.handleCreateFolder}
                    close={this.damFormModalViewModel.closeonSubmitModal}
                    viewModel={this.damFormModalViewModel}
                    validator={this.validator}
                    type="create"
                  />
                }
              />
            </Suspense>
          ) : null}

          {showUpdateModal ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ModalComponent
                show={showUpdateModal}
                onHide={this.damFormModalViewModel.closeUpdateCollectionModal}
                onShow={this.damFormModalViewModel.closeContextMenu}
                header={t('txt_rename')}
                body={
                  <CollectionForm
                    onSubmit={this.handleRename}
                    close={this.damFormModalViewModel.closeUpdateCollectionModal}
                    viewModel={this.damFormModalViewModel}
                    validator={this.validator}
                    type="update"
                  />
                }
              />
            </Suspense>
          ) : null}

          {showDeleteModal ? (
            <Suspense fallback={<div>Loading...</div>}>
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
                          text={t('txt_Cancel')}
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
            </Suspense>
          ) : null}
        </>
      );
    }
  }
);

export default withTranslation('common')(withDamViewModel(AesirXDamFormModal));
