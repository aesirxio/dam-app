import React, { Component } from 'react';
import DamViewModel from 'store/DamStore/DamViewModel';
import DamStore from 'store/DamStore/DamStore';
import { DamStoreProvider } from 'store/DamStore/DamViewModelContextProvider';

import AesirXDamStorageComponent from './AesirXDamStorage/index';
import ErrorBoundary from 'layouts/ErrorBoundary';
import i18n from 'translations/i18n';
import { I18nextProvider } from 'react-i18next';
import './index.scss';

const damStore = new DamStore();
const damsViewModel = new DamViewModel(damStore);

class AesirXDamStorage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <DamStoreProvider viewModel={damsViewModel}>
            <AesirXDamStorageComponent {...this.props} />;
          </DamStoreProvider>
        </I18nextProvider>
      </ErrorBoundary>
    );
  }
}

export default AesirXDamStorage;
