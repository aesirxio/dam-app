/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';

import { useThemeContext } from 'aesirx-uikit';
import HomeActionBar from 'containers/Homepage/HomeForm/HomeActionBar';
import HomeList from 'containers/Homepage/HomeList/HomeList';

const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);

const AesirXDamLayout = (props) => {
  const { theme } = useThemeContext();

  return (
    <div className="container-fluid h-100 dam-integrate-layout">
      <div className={`row h-100 ${theme ?? 'light'}`}>
        <DamStoreProvider viewModel={damsViewModel}>
          <div className="main_content main_content_dashboard h-100 d-flex">
            <div className="flex-1 bg-blue overflow-hidden overflow-y-auto position-relative main-content">
              <div className="h-100 d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <HomeActionBar {...props} />
                </div>
                <HomeList {...props} />
              </div>
            </div>
          </div>
        </DamStoreProvider>
      </div>
    </div>
  );
};

export default AesirXDamLayout;
