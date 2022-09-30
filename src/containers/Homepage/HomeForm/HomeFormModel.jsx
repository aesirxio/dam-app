/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import SimpleReactValidator from 'simple-react-validator';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { withHomeViewModel } from '../HomeViewModels/HomeViewModelContextProvider';
import HomeForm from './HomeForm';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import ComponentImage from 'components/ComponentImage';
import { GlobalStore } from 'store/Store';
import Button from 'components/Button';

const ModalComponent = lazy(() => import('../../../components/Modal'));

const HomeFormModal = observer(
  class HomeFormModal extends Component {
    homeFormModalViewModel = null;
    homeListViewModel = null;
    static contextType = GlobalStore;
    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;
      this.homeFormModalViewModel = viewModel ? viewModel.getHomeFormViewModel() : null;
      this.homeListViewModel = viewModel ? viewModel.getHomeListViewModel() : null;
    }

    updateDetail = () => {
      if (this.isFormValid()) {
        this.homeFormModalViewModel.saveOnModal();
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

    handleDelete = (data) => {
      this.homeFormModalViewModel.closeDeleteModal();
      if (this.homeFormModalViewModel.homeEditdata?.type) {
        this.homeListViewModel.deleteAssets(this.homeFormModalViewModel.homeEditdata);
      } else {
        this.context.globalViewModel.deleteCollections(this.homeFormModalViewModel.homeEditdata);
      }
    };

    render() {
      const { show, showDeleteModal, showContextMenu, openModal, downloadFile } =
        this.homeFormModalViewModel;
      const { t } = this.props;

      return (
        <>
          <div
            id="contextMenu"
            className={`d-flex align-items-center justify-content-center bg-white shadow-sm rounded-2 flex-column zindex-5 position-fixed cursor-pointer ${
              showContextMenu ? '' : 'd-none'
            }`}
            style={{
              top: this.homeFormModalViewModel.homeEditdata?.y ?? 0,
              left: this.homeFormModalViewModel.homeEditdata?.x ?? 0,
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
              // onClick={createFolder}
            >
              <ComponentImage
                // alt={row.original.name}
                src="/assets/images/move-to-folder.svg"
              />
              <span className="ms-3 text py-1 d-inline-block">{t('txt_move_to_folder')}</span>
            </div>
            <div
              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
              onClick={downloadFile}
            >
              <ComponentImage
                // alt={row.original.name}
                src="/assets/images/download.svg"
              />

              <span className="ms-3 text py-1 d-inline-block">{t('txt_download_folder')}</span>
            </div>
            <div
              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
              onClick={this.homeFormModalViewModel.openDeleteModal}
            >
              <FontAwesomeIcon icon={faTrashAlt} className=" d-inline-block align-text-bottom" />
              <span className="ms-3 text py-1 d-inline-block">{t('txt_delete_folder')}</span>
            </div>
          </div>
          <ModalComponent
            show={show}
            onHide={this.homeFormModalViewModel.closeModal}
            onShow={this.homeFormModalViewModel.closeContextMenu}
            body={<HomeForm viewModel={this.homeFormModalViewModel} validator={this.validator} />}
            dialogClassName={'minh-100 mw-100 home-modal'}
          />

          <ModalComponent
            show={showDeleteModal}
            onHide={this.homeFormModalViewModel.closeDeleteModal}
            onShow={this.homeFormModalViewModel.closeContextMenu}
            body={
              <div className="d-flex flex-column justify-content-center align-items-center pb-5">
                <ComponentImage className="mb-3" src="/assets/images/ep_circle-close.png" />
                <h4 className="mb-4">{t('txt_are_you_sure')}</h4>
                <p>{t('txt_delete_popup_desc')}</p>
                <div className="row">
                  <div className="col-auto">
                    <Button
                      // icon={faChevronRight}
                      text={t('txt_cancle')}
                      onClick={this.homeFormModalViewModel.closeDeleteModal}
                      className="btn btn-outline-white border "
                    />
                  </div>
                  <div className="col-auto">
                    <Button
                      // icon={faChevronRight}
                      text={t('txt_yes_delete')}
                      onClick={this.handleDelete}
                      className="btn btn-danger "
                    />
                  </div>
                </div>
              </div>
            }
            dialogClassName={'home-modal'}
          />
        </>
      );
    }
  }
);

export default withTranslation('common')(withHomeViewModel(HomeFormModal));
