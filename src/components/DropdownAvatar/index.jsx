/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

import { logout } from '../../auth';
import Helper from '../../utils/helper';
import ComponentImage from '../ComponentImage';
import styles from './index.module.scss';
const data = [
  {
    key: 1,
    text: 'txt_profile',
    link: '/profile',
  },
  // {
  //   key: 2,
  //   text: 'Billing & Plan',
  //   link: '/billing-plan',
  // },
  // {
  //   key: 3,
  //   text: "Members",
  // },
  // {
  //   key: 4,
  //   text: "My collections",
  // },
  // {
  //   key: 5,
  //   text: "Upgrade",
  // },
];

class DropdownAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Helper;

  // eslint-disable-next-line react/display-name
  CustomToggleAvatar = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center text-decoration-none cursor-pointer "
    >
      {Helper.isValidUrl(Storage.getItem(AUTHORIZATION_KEY.AVATAR)) ? (
        <ComponentImage
          src={Storage.getItem(AUTHORIZATION_KEY.AVATAR)}
          alt=""
          className="img-avatar rounded-circle object-fit-cover h-45"
        />
      ) : (
        <div className="position-relative d-inline-flex align-items-center justify-content-center text-uppercase cursor-pointer rounded-circle w-45 h-45 bg-gray-dark-70 ">
          <span className="text-white" style={{ fontSize: '1.75rem' }}>
            {Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME).slice(0, 1).slice(0, 1)}
          </span>
        </div>
      )}
      <div className="text ps-3 pe-3">
        <p className="mb-0 text-blue-0 fs-14 fw-bold">
          {Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME)}
        </p>
        {/* <p className="mb-0 text-blue-0 fs-14 opacity-75">Small business owner</p> */}
      </div>
      <i className="icons text-green">
        <FontAwesomeIcon icon={faChevronDown} />
      </i>
    </div>
  ));

  render() {
    const { t } = this.props;
    return (
      <div className="wrapper_avatar position-relative">
        <Dropdown>
          <Dropdown.Toggle
            as={this.CustomToggleAvatar}
            id="dropdown-custom-components position-relative"
          ></Dropdown.Toggle>
          <Dropdown.Menu className="shadow border-0 bg-header">
            <div className="p-3">
              <ul className={`list-unstyled ps-0 mb-0 ${styles.list_menu_avatar}`}>
                {data.map((value, index) => {
                  return (
                    <li key={index}>
                      <Dropdown.Item
                        href={value.link}
                        className="text-blue-0 btn btn-transparent d-block rounded-1 text-decoration-none p-2"
                      >
                        {t(value.text)}
                      </Dropdown.Item>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              onClick={logout}
              className="d-flex align-items-center p-3 text-green border-top-1 border-gray cursor-pointer"
            >
              <span className="ps-2 pe-2">{t('txt_sign_out')}</span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default withTranslation('dam')(DropdownAvatar);
