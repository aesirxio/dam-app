import React, { Suspense } from 'react';
import AesirXDamLayout from './AesirXDamLayout';
import { Toast } from 'components/Toast';
import ErrorBoundary from 'layouts/ErrorBoundary';
import i18n from 'translations/i18n';
import { I18nextProvider } from 'react-i18next';
import { ThemesContext, ThemesContextProvider } from 'themes/ThemeContextProvider';
import { BrowserRouter } from 'react-router-dom';

class AesirXDam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.getCurrentTheme(),
    };
  }
  getCurrentTheme() {
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
      localStorage.setItem('theme', 'light');
      return currentTheme ?? 'light';
    }
    return currentTheme;
  }
  changeTheme = (newTheme) => {
    this.setState({ theme: newTheme });
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }
  render() {
    return (
      <ThemesContextProvider value={{ theme: this.state.theme, changeTheme: this.changeTheme }}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <Toast />
            <BrowserRouter>
              <AesirXDamLayout />
            </BrowserRouter>
          </I18nextProvider>
        </ErrorBoundary>
      </ThemesContextProvider>
    );
  }
}
AesirXDam.contextType = ThemesContext;
export default AesirXDam;
