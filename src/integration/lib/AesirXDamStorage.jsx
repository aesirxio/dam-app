import React from 'react';

import Storage from 'components/Storage';
import appLanguages from 'translations';
import { AesirXI18nextProvider, ErrorBoundary } from 'aesirx-uikit';

const AesirXDamStorage = (props) => {
  return (
    <ErrorBoundary>
      <AesirXI18nextProvider appLanguages={appLanguages}>
        <div className="dam-integrate-layout">
          <Storage {...props} />;
        </div>
      </AesirXI18nextProvider>
    </ErrorBoundary>
  );
};

export default AesirXDamStorage;
