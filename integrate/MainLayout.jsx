/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';

import { Route, Redirect } from 'react-router-dom';

import Spinner from './components/Spinner';
import Header from './components/Header';
import SbarLeft from './components/SbarLeft';
import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';
// import HomeActionBar from 'containers/Homepage/HomeForm/HomeActionBar';
const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);
const MainLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <DamStoreProvider viewModel={damsViewModel}>
          <main className="p-0">
            <Header />
            <div className="main_content vh-100 main_content_dashboard pd-t-80 d-flex">
              {/* <SbarLeft /> */}
              <div className="flex-1 border-start-1 border-gray bg-blue mh-100 overflow-hidden overflow-y-auto position-relative main-content">
                <div className="py-4 px-3 h-100 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    {/* <HomeActionBar {...props} /> */}
                  </div>
                  {/* <Suspense fallback={<Spinner />}>
                    <HomeList />
                  </Suspense> */}
                </div>
              </div>
            </div>
          </main>
        </DamStoreProvider>
      </div>
    </div>
  );
};

export default MainLayout;
