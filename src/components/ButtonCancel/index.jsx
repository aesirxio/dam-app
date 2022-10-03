/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from 'react-i18next';


class ButtonCancel extends React.Component {
  render() {
    const {t}= this.props;
    return (
      <>
        <div>
          <a href="/profile" className="link_upgrade btn btn-white btn-outline-danger w-100">
            <i>
              <FontAwesomeIcon icon={faTimes} />
            </i>
            <span className="ms-2">{t('txt_cancel')}</span>
          </a>
        </div>
      </>
    );
  }
}

export default withTranslation('common')(ButtonCancel);
