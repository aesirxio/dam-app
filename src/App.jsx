/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import 'aesirx-uikit/dist/index.css';
import 'scss/app.scss';

import { AppProvider, Menu as AesirXMenu } from 'aesirx-uikit';
import appLanguages from 'translations';
import { authRoutes, mainRoutes, settingRoutes } from 'routes/routes';
import { isLogin } from 'auth';

import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';
import Search from 'components/Search';
import Storage from 'components/Storage';
import Menu from 'components/Menu';
import { settingMenu, profileMenu } from 'routes/menu';

const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);

const App = () => {
  return (
    <DamStoreProvider viewModel={damsViewModel}>
      <AppProvider
        appLanguages={appLanguages}
        authRoutes={authRoutes}
        mainRoutes={mainRoutes}
        settingRoutes={settingRoutes}
        profileMenu={profileMenu}
        isLogin={isLogin}
        componentHeader={<Search />}
        componentBottomMenu={<Storage />}
        leftMenu={<Menu />}
        settingMenu={<AesirXMenu dataMenu={settingMenu} />}
      />
    </DamStoreProvider>
  );
};

export default App;
