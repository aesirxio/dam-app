/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-lib';

const Xlsx = React.lazy(() => import('svg/Xlsx'));
const Word = React.lazy(() => import('svg/Word'));
const Pdf = React.lazy(() => import('svg/Pdf'));
const FileDefault = React.lazy(() => import('svg/File'));

class AesirXDamUtils {
  transformPersonaResponseIntoModel = (response) => {
    return response;
  };

  checkFileTypeFormData = (data) => {
    switch (data[DAM_ASSETS_FIELD_KEY.FILE_EXTENTION]) {
      case 'xlsx':
        return <Xlsx />;
      case 'docx':
        return <Word />;
      case 'pptx':
        return <Pdf />;
      default:
        return <FileDefault />;
    }
  };
}

const utils = new AesirXDamUtils();

export default utils;
