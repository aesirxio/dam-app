/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SubmitButton = ({ validateInfoBeforeSending }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('dam');

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const clickEvent = await validateInfoBeforeSending();
    clickEvent();
    setLoading(false);
  };
  return (
    <div>
      <div className="d-flex align-items-center row">
        <div>
          <button
            disabled={loading}
            onClick={handleClick}
            className="btn btn-success d-flex align-items-center ps-3 pe-3"
          >
            <i>
              <FontAwesomeIcon icon={faUserCog} />
            </i>
            <span className="flex-1 ps-2">{t('txt_update')}</span>
            {loading && (
              <span
                className={`ms-1 spinner-border text-body`}
                style={{ width: '20px', height: '20px' }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation('dam')(SubmitButton);
