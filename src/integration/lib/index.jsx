import React from 'react';
import AesirXDamLayout from './AesirXDamLayout';
import { Toast } from 'components/Toast';
import ErrorBoundary from 'layouts/ErrorBoundary';
import i18n from 'translations/i18n';
import { I18nextProvider } from 'react-i18next';
import './index.scss';
class AesirXDam extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Toast />
          <AesirXDamLayout {...this.props} />
        </I18nextProvider>
      </ErrorBoundary>
    );
  }
}
export default AesirXDam;
