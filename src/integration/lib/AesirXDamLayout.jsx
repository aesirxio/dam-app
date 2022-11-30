/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import AesirXSbarLeft from './AesirXDamSideBar/AesirXDamSBarLeft';
import ModalComponent from 'components/Modal';
import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';

import AsirsxDamComponent from './AsirsxDamComponent';
import AesirXDamActionBar from './AesirXDamForm/AesirXDamActionBar';
import './index.scss';

const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);
class AesirXDamLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ModalComponent
        body={
          <div className="container-fluid">
            <div className="row">
              <DamStoreProvider viewModel={damsViewModel}>
                <div className="main_content main_content_dashboard d-flex">
                  <AesirXSbarLeft />
                  <div className="flex-1 border-start-1 border-gray bg-blue mh-100 overflow-hidden overflow-y-auto position-relative main-content">
                    <div className="py-4 px-3 h-100 d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <AesirXDamActionBar {...this.props} />
                      </div>
                      <AsirsxDamComponent {...this.props} />
                    </div>
                  </div>
                </div>
              </DamStoreProvider>
            </div>
          </div>
        }
        modalClassname={this.props.modalClassname ?? 'd-flex align-items-center'}
        contentClassName={this.props.contentClassName ?? 'dam-modal-content'}
        bodyClassName={this.props.bodyClassName ?? 'px-0 dam-modal-body'}
        dialogClassName={this.props.dialogClassName ?? 'mw-100 w-100 dam-modal-diablog'}
        show={this.props.show}
        onHide={() => this.props.onHide() ?? {}}
        onShow={() => this.props.onShow() ?? {}}
      />
    );
  }
}

export default AesirXDamLayout;
