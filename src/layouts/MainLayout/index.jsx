/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { mainRoutes } from '../../routes/routes';

import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import SbarLeft from '../../components/SbarLeft';
import { isLogin } from '../../auth';
import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';
const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);
const MainLayout = () => {
  return isLogin() ? (
    <div className="container-fluid">
      <div className="row">
        <DamStoreProvider viewModel={damsViewModel}>
          <main className="p-0">
            <Header />
            <div className="main_content vh-100 main_content_dashboard pd-t-80 d-flex">
              <SbarLeft />
              <div className="flex-1 border-start-1 border-gray mh-100 overflow-hidden overflow-y-auto position-relative main-content bg-theme">
                <Suspense fallback={<Spinner />}>
                  {mainRoutes.map(({ path, exact, main }, i) => {
                    return <Route key={i} exact={exact} path={path} component={main} />;
                  })}
                </Suspense>
              </div>
            </div>
          </main>
        </DamStoreProvider>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default MainLayout;
