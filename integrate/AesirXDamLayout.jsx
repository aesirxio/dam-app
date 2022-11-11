/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { Route, BrowserRouter, Router, Switch } from 'react-router-dom';

import AesirXSbarLeft from './AesirXDamSideBar/AesirXDamSBarLeft';
import ModalComponent from 'components/Modal';
import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';

import history from 'routes/history';
import AsirsxDamComponent from './AsirsxDamComponent';
import AesirXDamActionBar from './AesirXDamForm/AesirXDamActionBar';
import './index.scss';

const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);
class AesirXDamLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={['/*']}>
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
                            <AsirsxDamComponent />
                          </div>
                        </div>
                      </div>
                    </DamStoreProvider>
                  </div>
                </div>
              }
              modalClassname="d-flex align-items-center"
              contentClassName="dam-modal-content"
              bodyClassName="px-0 dam-modal-body"
              dialogClassName="mw-100 w-100 dam-modal-diablog"
              // onShow={this.damFormModalViewModel.closeContextMenu}
              show={this.state.show}
              onHide={() => this.setState((prevState) => ({ ...prevState, show: !prevState.show }))}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default AesirXDamLayout;
