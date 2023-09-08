/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';

import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_API_RESPONSE_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-lib';
import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, ModalComponent, Button } from 'aesirx-uikit';

import MoveToFolder from 'components/MoveToFolder';
import AesirXDamForm from './AesirXDamForm';
import Dropzone from 'components/Dropzone';
import EditingIcon from 'svg/EddingIcon';
import MoveFolderIcon from 'svg/MoveFolderIcon';
import PreviewIcon from 'svg/EyeIcon';
import DownLoadIcon from 'svg/DownloadIcon';
import DeleteIcon from 'svg/TrashIcon';

const AesirXDamFormModal = observer(
  class AesirXDamFormModal extends Component {
    damFormModalViewModel = null;
    damListViewModel = null;
    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;
      this.damFormModalViewModel = viewModel ? viewModel.getDamFormViewModel() : null;
      this.damListViewModel = viewModel ? viewModel.getDamListViewModel() : null;
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

    handleRename = () => {
      this.damFormModalViewModel.openCreateCollectionModal();
      this.damFormModalViewModel.closeContextMenuItem();
      document.querySelector(`#id_${this.damFormModalViewModel.damEditdata?.id}`).focus();
    };

    handleCreateFolder = () => {
      const { t } = this.props;
      const collectionId = this.damListViewModel.damLinkFolder.split('/');
      const currentCollection = !isNaN(collectionId[collectionId.length - 1])
        ? collectionId[collectionId.length - 1]
        : 0;
      this.damFormModalViewModel.closeContextMenu();
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
        this.damFormModalViewModel.closeContextMenu();
      }
    };

    render() {
      const {
        show,
        showDeleteModal,
        showContextMenu,
        showContextMenuItem,
        openModal,
        downloadFile,
        setOnEditCollection,
        showMoveToFolder,
        openMoveToFolder,
      } = this.damFormModalViewModel;
      const {
        deleteItem,
        actionState: { selectedCards },
      } = this.damListViewModel;
      const { t } = this.props;

      const collectionId = this.damListViewModel.damLinkFolder.split('/');
      const currentCollectionId = !isNaN(collectionId[collectionId.length - 1])
        ? collectionId[collectionId.length - 1]
        : 0;
      return (
        <>
          {show && (
            <Suspense fallback={''}>
              <ModalComponent
                show={show}
                onHide={this.damFormModalViewModel.closeModal}
                onShow={() => {
                  this.damFormModalViewModel.closeContextMenuItem();
                  this.damFormModalViewModel.closeContextMenu();
                }}
                closeButton
                contentClassName={'bg-white shadow'}
                body={
                  <AesirXDamForm
                    delete={deleteItem}
                    handleUpdate={this.handleUpdate}
                    viewModel={this.damFormModalViewModel}
                  />
                }
                dialogClassName={'modal-fullscreen'}
              />
            </Suspense>
          )}

          {showContextMenu && (
            <div
              id="contextMenu"
              className={`col_thumb cursor-pointer align-self-center mb-4 bg-white zindex-5 position-fixed`}
              style={{ ...this.damListViewModel.actionState?.style }}
            >
              <div className="item_thumb d-flex bg-white shadow-sm rounded-2  flex-column">
                <Dropzone createAssets={this.handleCreateAssets}>
                  <div
                    className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none cursor-pointer txt_hover`}
                  >
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className=" d-inline-block align-text-bottom"
                    />

                    <span className="ms-3 text py-1 d-inline-block">{t('txt_upload_file')}</span>
                  </div>
                </Dropzone>
                <div
                  className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none `}
                  onClick={setOnEditCollection}
                >
                  <FontAwesomeIcon icon={faFolder} className=" d-inline-block align-text-bottom" />

                  <span className="ms-3 text py-1 d-inline-block">{t('txt_create_folder')}</span>
                </div>
              </div>
            </div>
          )}

          {showContextMenuItem && (
            <div
              id="contextMenuItem"
              className={`d-flex align-items-center justify-content-center bg-white shadow-sm rounded-2 flex-column zindex-5 position-fixed cursor-pointer`}
              style={{ ...this.damListViewModel.actionState?.style }}
            >
              <div
                className={`d-flex align-items-center px-4 py-3  text-decoration-none w-100`}
                onClick={openModal}
              >
                <Suspense fallback={''}>
                  <PreviewIcon className="stroke-dark" />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block">{t('txt_preview')}</span>
              </div>
              {selectedCards.length < 2 && (
                <div
                  className={`d-flex align-items-center px-4 py-3  text-decoration-none w-100`}
                  onClick={this.handleRename}
                >
                  <Suspense fallback={''}>
                    <EditingIcon />
                  </Suspense>
                  <span className="ms-3 text-color py-1 d-inline-block">{t('txt_rename')}</span>
                </div>
              )}
              <div
                className={`d-flex align-items-center px-4 py-3  text-decoration-none w-100`}
                onClick={openMoveToFolder}
              >
                <Suspense fallback={''}>
                  <MoveFolderIcon className="stroke-dark" />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block">
                  {t('txt_move_to_folder')}
                </span>
              </div>
              {this.damFormModalViewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] && (
                <div
                  className={`d-flex align-items-center px-4 py-3  text-decoration-none w-100`}
                  onClick={downloadFile}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <DownLoadIcon className="stroke-dark" />
                  </Suspense>
                  <span className="ms-3 text-color py-1 d-inline-block">
                    {t('txt_download_folder')}
                  </span>
                </div>
              )}
              <div
                className={`d-flex align-items-center px-4 py-3  text-decoration-none w-100`}
                onClick={this.damFormModalViewModel.openDeleteModal}
              >
                <Suspense fallback={''}>
                  <DeleteIcon />
                </Suspense>
                <span className="ms-3 text-color py-1 d-inline-block text-danger">
                  {t('txt_delete')}
                </span>
              </div>
            </div>
          )}

          {showDeleteModal ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ModalComponent
                closeButton
                show={showDeleteModal}
                onHide={this.damFormModalViewModel.closeDeleteModal}
                onShow={() => {
                  this.damFormModalViewModel.closeContextMenuItem();
                  this.damFormModalViewModel.closeContextMenu();
                }}
                contentClassName={'bg-white shadow'}
                body={
                  <div className="d-flex flex-column justify-content-center align-items-center pb-5">
                    <Image className="mb-3" src="/assets/images/ep_circle-close.png" />
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
                          className="btn btn-outline-gray-300 bg-white text-blue-0 border-1 "
                        />
                      </div>
                      <div className="col-auto">
                        <Button
                          text={t('txt_yes_delete')}
                          onClick={deleteItem}
                          className="btn btn-danger "
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            </Suspense>
          ) : null}

          {showMoveToFolder && (
            <ModalComponent
              show={showMoveToFolder}
              onHide={this.damFormModalViewModel.closeMoveToFolder}
              contentClassName={'bg-white shadow'}
              header={false}
              body={<MoveToFolder current={currentCollectionId} />}
            />
          )}
        </>
      );
    }
  }
);

export default withTranslation()(withDamViewModel(AesirXDamFormModal));
