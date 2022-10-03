/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy, Suspense } from 'react';
import Spinner from '../../components/Spinner';

import SettingStore from './SettingStore/SettingStore';

import { withTranslation } from 'react-i18next';
import SettingViewModel from './SettingViewModel/SettingViewModel';
import { SettingViewModelContextProvider } from './SettingViewModel/SettingViewModelContextProvider';
import SettingList from './SettingList/SettingList';
import './index.scss';
const settingStore = new SettingStore();

const settingViewModel = new SettingViewModel(settingStore);

const HomePage = (props) => {
  const { t } = props;

  return (
    <SettingViewModelContextProvider viewModel={settingViewModel}>
      <div className="py-4 px-3 h-100 storage-content">
        <div className="mb-4">
          <h2 className="text-blue-0">{t('txt_configuration_storage')}</h2>
          <p>{t('txt_configuration_desc')}</p>
        </div>
        <Suspense fallback={<Spinner />}>
          <SettingList />
        </Suspense>
      </div>
    </SettingViewModelContextProvider>
  );
};

export default withTranslation('common')(HomePage);
