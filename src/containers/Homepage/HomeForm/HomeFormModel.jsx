/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
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

const ModalComponent = lazy(() => import('../../../components/Modal'));

const HomeFormModal = observer(
  class HomeFormModal extends Component {
    homeFormModalViewModel = null;
    homeListViewModel = null;
    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;
      this.homeFormModalViewModel = viewModel ? viewModel.getHomeFormViewModel() : null;
    }

    updateDetail = () => {
      if (this.isFormValid()) {
        this.homeFormModalViewModel.saveOnModal();
      }
    };

    cancelSavingHandler = () => {
      this.homeFormModalViewModel.closeModal();
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

    render() {
      const { show, editMode, showContextMenu, openModal } = this.homeFormModalViewModel;
      const { t } = this.props;
      // if (!show && !showContextMenu) {
      //   return null;
      // }

      return (
        <>
          <div
            id="contextMenu"
            className={`w-248 d-flex align-items-center justify-content-center bg-white shadow-sm rounded-2 flex-column zindex-5 position-fixed cursor-pointer ${
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
              // onClick={createFolder}
            >
              <ComponentImage
                // alt={row.original.name}
                src="/assets/images/download.svg"
              />

              <span className="ms-3 text py-1 d-inline-block">{t('txt_download_folder')}</span>
            </div>
            <div
              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none w-100`}
              // onClick={createFolder}
            >
              <FontAwesomeIcon icon={faTrashAlt} className=" d-inline-block align-text-bottom" />
              <span className="ms-3 text py-1 d-inline-block">{t('txt_delete_folder')}</span>
            </div>
          </div>
          <ModalComponent
            show={show}
            onHide={this.homeFormModalViewModel.closeModal}
            header={
              editMode === false || editMode == null
                ? t('txt_create_a_new_project')
                : t('txt_edit_project')
            }
            body={<HomeForm viewModel={this.homeFormModalViewModel} validator={this.validator} />}
            dialogClassName={'minh-100 mw-100'}
            // footer={
            //   <Button onClick={this.updateDetail} className="btn btn-success w-100">
            //     <span>
            //       {editMode === false || editMode == null
            //         ? t('txt_create_project')
            //         : t('txt_save_project')}
            //     </span>
            //     <i className="ms-1">
            //       <FontAwesomeIcon icon={faChevronRight} />
            //     </i>
            //   </Button>
            // }
            // key={Math.random(40, 200)}
          />
        </>
      );
    }
  }
);

export default withTranslation('common')(withHomeViewModel(HomeFormModal));
