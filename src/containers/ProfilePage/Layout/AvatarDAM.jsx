/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { UPDATE_GENERAL_FIELD_KEY } from 'constants/ProfileModule';
import ModalDAMComponent from 'components/ModalDamComponent';
import { Image } from 'aesirx-uikit';

const AvatarDAM = ({ formPropsData, avatarOnSelectHandler }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const onSelect = (data) => {
    const imgUrl = data[0]?.download_url;
    avatarOnSelectHandler(imgUrl);
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className="mb-3 mb-lg-0 d-flex justify-content-center">
      <div>
        <ModalDAMComponent show={show} onHide={handleClose} onSelect={onSelect} />
        <label className="fw-semibold mb-4 fw-semibold form-label d-block mb-2" htmlFor="name">
          {t('txt_your_avatar')}
        </label>
        <div
          className="position-relative d-inline-block cursor-pointer rounded-circle h-196 w-196 bg-gray-dark-70 mb-4"
          onClick={() => setShow(true)}
        >
          {formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] != '' ? (
            <Image
              className={`rounded-circle h-196 w-196 object-fit-cover opacity-50 mb-1`}
              src={formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]}
              alt={formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME]}
            />
          ) : (
            <div className="position-relative d-inline-flex align-items-center justify-content-center text-uppercase cursor-pointer rounded-circle bg-gray-dark-70 opacity-50 h-196 w-196 ">
              <span className="text-white" style={{ fontSize: '9rem' }}>
                {formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME].slice(0, 1)}
              </span>
            </div>
          )}
          <div className="position-absolute w-100 h-100 d-flex align-items-center top-0 start-0 align-content-center text-white text-center">
            <div className="w-100 px-1">
              <FontAwesomeIcon icon={faCloudUploadAlt} className={`fs-3 mb-1`} />
              <div>{t('txt_click_to_change_image')}</div>
            </div>
          </div>
        </div>
        <div className="my-8px fs-14 text-gray-dark opacity-50">{t('txt_max_file_size')}</div>
      </div>
    </div>
  );
};

export default AvatarDAM;
