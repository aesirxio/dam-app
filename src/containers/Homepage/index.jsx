/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, {  lazy, Suspense } from 'react';
import Spinner from '../../components/Spinner';

import HomeStore from './HomeStore/HomeStore';

import HomeViewModel from './HomeViewModels/HomeViewModel';

import { HomeViewModelContextProvider } from './HomeViewModels/HomeViewModelContextProvider';
import { withTranslation } from 'react-i18next';
import HomeActionBar from './HomeForm/HomeActionBar';

const HomeList = lazy(() => import('./HomeList/HomeList'));

const homeStore = new HomeStore();

const homeViewModel = new HomeViewModel(homeStore);

const HomePage = (props) => {
  const { t } = props;

  return (
    <HomeViewModelContextProvider viewModel={homeViewModel}>
      <div className="py-4 px-3 h-100 d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="text-blue-0">{t('txt_your_digital_assets')}</h2>
          <HomeActionBar {...props} />
        </div>
        <Suspense fallback={<Spinner />}>
          <HomeList />
        </Suspense>
      </div>
    </HomeViewModelContextProvider>
  );
};

export default withTranslation('common')(HomePage);
