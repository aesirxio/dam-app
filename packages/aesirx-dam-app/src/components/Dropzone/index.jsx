/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import CloudUpload from 'svg/CloudUpload';

const Dropzone = ({
  children,
  noClick,
  createAssets,
  className,
  isBtn = true,
  noDrag = true,
  accept = '*',
}) => {
  const [onDrag, setOnDrag] = useState(false);
  const { t } = useTranslation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    noClick: noClick,
    noDrag: noDrag,
    // maxFiles: 1,
    multiple: true,
    onDragEnter: () => {
      setOnDrag(true);
    },
    onDragLeave: () => {
      setOnDrag(false);
    },
    onDrop: (acceptedFiles) => {
      setOnDrag(false);
      createAssets(acceptedFiles);
    },
  });

  return (
    <div
      className={`
        ${
          !isBtn
            ? `position-absolute h-100 w-100 top-0 start-0 ${onDrag ? 'zindex-3' : 'zindex-1'}`
            : ''
        }
      `}
    >
      <div className={`${className ?? 'w-100 h-100'} ${onDrag ? '' : 'position-relative'}`}>
        <span className={`${onDrag ? styles.onDragEnter : ''} pe-none`}></span>
        <div {...getRootProps()} className={'cursor-auto w-100 h-100 outline-none'}>
          <input
            {...getInputProps()}
            className="position-absolute start-0 top-0 bottom-0 end-0 cursor-auto outline-none"
          />

          {children}
        </div>
        {onDrag ? (
          <div
            className={`d-flex flex-column align-items-center pe-none text-center ${styles.dropToUpload}`}
          >
            <CloudUpload className={`fa-bounce ${styles.bounce}`} />
            <button className={`m-0 btn zindex-3 shadow-none px-4 btn-success text-white`}>
              {t('txt_drop_to_upload')}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dropzone;
