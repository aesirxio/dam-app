import React from 'react';
import AesirXDamLayout from './AesirXDamLayout';
import { Toast, AesirXI18nextProvider, ErrorBoundary } from 'aesirx-uikit';

import appLanguages from 'translations';

const AesirXDam = (props) => {
  return (
    <ErrorBoundary>
      <AesirXI18nextProvider appLanguages={appLanguages}>
        <Toast />
        <AesirXDamLayout {...props} />
      </AesirXI18nextProvider>
    </ErrorBoundary>
  );
};

export default AesirXDam;
