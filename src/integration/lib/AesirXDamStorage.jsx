import React, { Component } from 'react';

import ErrorBoundary from 'layouts/ErrorBoundary';
import i18n from 'translations/i18n';
import { I18nextProvider } from 'react-i18next';
import Storage from 'components/Storage';

class AesirXDamStorage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <div className="dam-integrate-layout">
            <Storage {...this.props} integration={true} />;
          </div>
        </I18nextProvider>
      </ErrorBoundary>
    );
  }
}

export default AesirXDamStorage;
