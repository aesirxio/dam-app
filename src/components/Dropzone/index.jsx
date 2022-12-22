/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './index.module.scss';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { useTranslation } from 'react-i18next';

// import ComponentImage from '../ComponentImage';

const Dropzone = ({ children, noClick, createAssets, className, isBtn = true, noDrag = true }) => {
  const [onDrag, setOnDrag] = useState(false);
  const { t } = useTranslation('common');
  const { getRootProps, getInputProps } = useDropzone({
    // accept: '*',
    noClick: noClick,
    noDrag: noDrag,
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => {
      setOnDrag(true);
    },
    onDragLeave: () => {
      setOnDrag(false);
    },
    onDrop: (acceptedFiles) => {
      setOnDrag(false);
      createAssets(acceptedFiles[0]);
    },
  });

  return (
    <div
      className={
        !isBtn
          ? `position-absolute h-100 w-100 top-0 start-0 ${onDrag ? 'zindex-3' : 'zindex-1'}`
          : ''
      }
    >
      <div
        className={`${className ?? 'w-100 h-100'} ${
          onDrag ? styles.ondragenter : 'position-relative '
        } `}
      >
        <div {...getRootProps()} className={'cursor-auto w-100 h-100 outline-none'}>
          <input
            {...getInputProps()}
            className="position-absolute start-0 top-0 bottom-0 end-0 cursor-auto outline-none"
          />

          {children}
        </div>
        {onDrag ? (
          <div className={` text-center zindex-3 ${styles.droptoupload}`}>
            <FontAwesomeIcon
              style={{ width: 50, height: 50 }}
              color="#fff"
              icon={faCloudUploadAlt}
              bounce={true}
              className={styles.bounce}
            />
            <p className={``}>{t('txt_drop_to_upload')}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dropzone;
