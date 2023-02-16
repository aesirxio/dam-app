/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';

import './index.scss';

import { login } from '../../auth';
import InputPassword from '../../components/inputPassword';
// import ComponentImage from 'components/ComponentImage';
import { SSOButton } from 'aesirx-sso';
import { AesirxAuthenticationApiService, Storage } from 'aesirx-dma-lib';
import Checkbox from 'components/Checkbox';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: process.env.REACT_APP_DEMO_USER ?? '',
      password: process.env.REACT_APP_DEMO_PASSWORD ?? '',
      remember: false,
      isProcessing: false,
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.usernameInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit() {
    if (this.validator.allValid()) {
      await login(this.state);
    } else {
      this.validator.showMessages();
      return;
    }
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.handleSubmit();
    }
  };

  render() {
    const { t } = this.props;
    const onGetData = async (response) => {
      const authService = new AesirxAuthenticationApiService();
      await authService.setTokenUser(response, false);
      Storage.setItem('auth', true);
      window.location.reload();
    };
    return (
      <div className="vh-100 bg-blue-9 ">
        <div className="row g-0 justify-content-center align-items-center h-100 bg-white">
          <div className="d-block login-container">
            <h1 className="fs-2 text-blue-new fw-semibold text-center mb-4 lh-base">
              {t('txt_welcome_to')}
              <img
                className="px-1"
                style={{ verticalAlign: 'inherit' }}
                alt="aesirx"
                src="/assets/images/logo/welcome-logo.png"
              />{' '}
              DAM
              <br />
              {t('txt_sign_in_to_getting_started')}
            </h1>
            <form className="login-form">
              <SSOButton
                className="btn w-100 fw-bold btn-blue-3 position-relative d-flex align-item-center justify-content-center mb-4 px-6 btn-primary h-48px"
                text={t('txt_sign_in_with_sso')}
                onGetData={onGetData}
              />
              <div className="d-flex align-items-center flex-nowrap mb-4">
                <div className="border-bottom w-50"></div>
                <span className="text-uppercase fw-medium text-gray px-3">{t('txt_or')}</span>
                <div className="border-bottom w-50"></div>
              </div>
              <label className="form-label fw-semibold text-black mb-10">
                {t('txt_Email')} <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control border h-48px"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                ref={this.usernameInput}
                onBlur={() => {
                  this.validator.showMessageFor(t('txt_Email'));
                }}
              />
              {this.validator.message(t('txt_Email'), this.state.username, 'required', {
                className: 'text-danger',
              })}
              <label className="form-label fw-semibold mt-4 mb-10 text-black" htmlFor="password">
                {t('txt_projectpage_password')} <span className="text-danger">*</span>
              </label>
              <InputPassword
                type="password"
                className="form-control border h-48px"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                onKeyPress={this.onKeyPress}
                onBlur={() => {
                  this.validator.showMessageFor(t('txt_projectpage_password'));
                }}
              />
              {this.validator.message(
                t('txt_projectpage_password'),
                this.state.password,
                'required',
                {
                  className: 'text-danger',
                }
              )}
              <div className="d-flex justify-content-between pt-4 text-black">
                <Checkbox text={t('txt_remember_me')} />
                <a
                  href="https://dam.aesirx.io/auth/forgotpassword"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex fw-semibold fs-6"
                >
                  {t('tx_forgot_password')}
                </a>
              </div>
              <button
                type="button"
                className={`btn w-100 fw-bold btn-success position-relative d-flex align-item-center justify-content-center wr_btn_login mt-4 text-uppercase py-14`}
                onClick={this.handleSubmit}
              >
                {t('txt_sign_in')}
                <div className="ps-2 btn_loading">
                  <div
                    className="spinner-border"
                    style={{ width: '1.7rem', height: '1.7rem' }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(LoginPage);
