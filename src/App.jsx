/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import 'aesirx-uikit/dist/index.css';
import 'scss/app.scss';

import { AppProvider } from 'aesirx-uikit';
import appLanguages from 'translations';
import { authRoutes, mainRoutes } from 'routes/routes';
import { isLogin } from 'auth';

import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';
import SbarLeft from 'components/SbarLeft';
import Search from 'components/Search';
const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);

const App = () => {
  return (
    <DamStoreProvider viewModel={damsViewModel}>
      <AppProvider
        appLanguages={appLanguages}
        authRoutes={authRoutes}
        mainRoutes={mainRoutes}
        isLogin={isLogin}
        componentHeader={<Search />}
        rootId="#root"
        leftMenu={<SbarLeft />}
      />
    </DamStoreProvider>
  );
};

export default App;
