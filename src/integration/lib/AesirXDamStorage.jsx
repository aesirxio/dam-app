import React, { Component } from 'react';

import Storage from 'components/Storage';
import appLanguages from 'translations';
import { AesirXI18nextProvider, ErrorBoundary } from 'aesirx-uikit';

class AesirXDamStorage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ErrorBoundary>
        <AesirXI18nextProvider appLanguages={appLanguages}>
          <div className="dam-integrate-layout">
            <Storage {...this.props} integration={true} />;
          </div>
        </AesirXI18nextProvider>
      </ErrorBoundary>
    );
  }
}

export default AesirXDamStorage;
