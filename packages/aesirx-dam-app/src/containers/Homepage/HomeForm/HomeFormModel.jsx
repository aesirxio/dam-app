/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';

import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import HomeForm from './HomeForm';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_API_RESPONSE_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-lib';
import { history, Image, ModalComponent, Button } from 'aesirx-uikit';
import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons/faCircleXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../index.module.scss';
import MoveToFolder from 'components/MoveToFolder';

const Dropzone = React.lazy(() => import('components/Dropzone'));
const EditingIcon = React.lazy(() => import('svg/EddingIcon'));
const MoveFolderIcon = React.lazy(() => import('svg/MoveFolderIcon'));
const PreviewIcon = React.lazy(() => import('svg/EyeIcon'));
const DownLoadIcon = React.lazy(() => import('svg/DownloadIcon'));
const DeleteIcon = React.lazy(() => import('svg/TrashIcon'));

const HomeFormModal = observer(
  class HomeFormModal extends Component {
    damFormModalViewModel = null;
    damListViewModel = null;
    constructor(props) {
      super(props);

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
        // rerender to show messages for the first time
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
      this.damFormModalViewModel.setOnEditCollection();
      this.damFormModalViewModel.closeContextMenuItem();
      document.querySelector(`#id_${this.damFormModalViewModel.damEditdata?.id}`).focus();
    };

    handleCreateFolder = () => {
      const { t } = this.props;

      const collectionId = history.location.pathname.split('/');
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
        // isEditCollection,
        // showUpdateModal,
        showMoveToFolder,
        openMoveToFolder,
      } = this.damFormModalViewModel;
      const {
        deleteItem,
        actionState: { selectedCards = [] },
      } = this.damListViewModel;
      const { t } = this.props;
      const collectionId = history.location.pathname.split('/');
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
                header={
                  <div className="py-3">
                    <div
                      className="position-absolute top-0 end-0 mx-4 my-3"
                      onClick={this.damFormModalViewModel.closeModal}
                    >
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className=" d-inline-block align-text-bottom text-success fs-3"
                      />
                    </div>
                  </div>
                }
                contentClassName={'bg-white shadow'}
                bodyClassName='border-top'
                body={
                  <HomeForm
                    delete={deleteItem}
                    handleUpdate={this.handleUpdate}
                    viewModel={this.damFormModalViewModel}
                  />
                }
                dialogClassName={' modal-80w '}
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
                    className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none cursor-pointer ${styles.txt_hover}`}
                  >
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className=" d-inline-block align-text-bottom"
                    />

                    <span className="ms-3 text py-1 d-inline-block">{t('txt_upload_file')}</span>
                  </div>
                </Dropzone>
                <div
                  className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none ${styles.txt_hover}`}
                  onClick={this.handleCreateFolder}
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
              className={`d-flex align-items-center justify-content-center bg-white shadow-lg rounded-2 flex-column zindex-5 position-fixed cursor-pointer ${styles.contextMenuItem}`}
              style={{ ...this.damListViewModel.actionState?.style }}
            >
              <div
                className={`d-flex align-items-center rounded-1 px-4 py-3 text-decoration-none w-100`}
                onClick={openModal}
              >
                <Suspense fallback={''}>
                  <PreviewIcon className="stroke-dark " />
                </Suspense>
                <span className="ms-3 text-gray-dark py-1 d-inline-block">{t('txt_preview')}</span>
              </div>
              {selectedCards.length < 2 && (
                <div
                  className={`d-flex align-items-center rounded-1 px-4 pb-3  text-decoration-none w-100`}
                  onClick={this.handleRename}
                >
                  <Suspense fallback={''}>
                    <EditingIcon />
                  </Suspense>
                  <span className="ms-3 text-gray-dark py-1 d-inline-block">{t('txt_rename')}</span>
                </div>
              )}
              <div
                className={`d-flex align-items-center rounded-1 px-4 pb-3  text-decoration-none w-100`}
                onClick={this.damFormModalViewModel.openMoveToFolder}
              >
                <Suspense fallback={''}>
                  <MoveFolderIcon className="stroke-dark " />
                </Suspense>
                <span className="ms-3 text-gray-dark py-1 d-inline-block">
                  {t('txt_move_to_folder')}
                </span>
              </div>
              <div
                className={`d-flex align-items-center rounded-1 px-4 pb-3  text-decoration-none w-100`}
                onClick={downloadFile}
              >
                <Suspense fallback={''}>
                  <DownLoadIcon className="stroke-dark" />
                </Suspense>
                <span className="ms-3 text-gray-dark py-1 d-inline-block">
                  {t('txt_download_folder')}
                </span>
              </div>

              <div
                className={`d-flex align-items-center rounded-1 px-4 pb-3 text-decoration-none w-100`}
                onClick={this.damFormModalViewModel.openDeleteModal}
              >
                <Suspense fallback={''}>
                  <DeleteIcon />
                </Suspense>
                <span className="ms-3 py-1 d-inline-block text-danger">{t('txt_delete')}</span>
              </div>
            </div>
          )}

          {showDeleteModal && (
            <Suspense fallback={''}>
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
                    <h4 className="mb-2">{t('txt_are_you_sure')}</h4>
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
                          className="btn btn-outline-gray-300 bg-white text-body border-1 "
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
          )}

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

export default withTranslation()(withDamViewModel(HomeFormModal));
