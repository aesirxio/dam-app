/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';
import Spinner from '../../components/Spinner';

import HomeActionBar from './HomeForm/HomeActionBar';
import HomeList from './HomeList/HomeList';
import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';
const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);

const HomePage = (props) => {
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <DamStoreProvider viewModel={damsViewModel}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <HomeActionBar {...props} />
        </div>
        <Suspense fallback={<Spinner />}>
          <HomeList />
        </Suspense>
      </DamStoreProvider>
    </div>
  );
};

export default HomePage;
