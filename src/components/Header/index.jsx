/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';

import './index.scss';

import DropdownAvatar from '../DropdownAvatar';

import ComponentHambuger from '../ComponentHambuger';
import ComponentImage from '../ComponentImage';
import Search from 'components/Search';

import SwitchThemes from 'components/SwitchThemes/index';
import Select from 'components/Select/index';
import styles from './index.module.scss';
import i18n from 'translations/i18n';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMenuLeft = () => {
    document.querySelector('.main-layout').classList.toggle('show_menu_left');
  };

  render() {
    const { t } = this.props;

    const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
      return {
        value: key,
        label: i18n.options.resources[key].title,
      };
    });
    const currentLanguage = listLanguages.filter((lang) => {
      if (lang.value == i18n.language) {
        return lang;
      }
    });
    return (
      <div
        id="all_header"
        className="wrapper_header d-flex position-fixed w-100 top-0 left-0 right-0 pr-3 align-items-center shadow-sm z-index-100 bg-header"
      >
        <ComponentHambuger handleAction={this.handleMenuLeft} />
        <div className="wrapper_header_logo bg-dark flex-248 h-80 d-flex align-items-center">
          <a href="/" className={`header_logo d-block px-3`}>
            <ComponentImage
              className="logo_white pe-6"
              src="/assets/images/logo/logo-white.svg"
              alt="R Digital"
            />
          </a>
        </div>
        <div className="content_header h-80 border-bottom-1 border-header flex-1 d-flex align-items-center position-relative bg-header">
          <div className="d-flex flex-1 align-items-center px-32px">
            <Search />
            <div className={`ms-auto d-flex align-items-center ${styles.custom_select}`}>
              <FontAwesomeIcon icon={faGlobe} className="text-body" />
              <Select
                isClearable={false}
                isSearchable={false}
                isBorder={false}
                isShadow={false}
                options={listLanguages}
                className="shadow-none"
                onChange={(data) => {
                  i18n.changeLanguage(data.value);
                }}
                defaultValue={currentLanguage}
              />
            </div>
            <div className="switch-theme-button col-auto py-2 px-3">
              <SwitchThemes />
            </div>
            <div className="d-flex align-items-center">
              <div className="wr_help_center ps-3 pe-3 d-none">
                <span className="item_help d-flex align-items-center text-blue-0 cursor-pointer">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <span className="text white-spacing-nowrap ps-2">{t('txt_help_center')}</span>
                </span>
              </div>

              <div className="ps-3 pe-3">
                <DropdownAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(Header);
