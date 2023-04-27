import React from 'react';
import AesirXDamLayout from './AesirXDamLayout';
import { Toast, AesirXI18nextProvider, ErrorBoundary } from 'aesirx-uikit';

import appLanguages from 'translations';
class AesirXDam extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ErrorBoundary>
        <AesirXI18nextProvider appLanguages={appLanguages}>
          <Toast />
          <AesirXDamLayout {...this.props} />
        </AesirXI18nextProvider>
      </ErrorBoundary>
    );
  }
}
export default AesirXDam;
