/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib';

// import HomeModel from '../HomeModel/HomeModel';

class HomeUtils {
  transformPersonaResponseIntoModel = (response) => {
    return response;
  };

  checkFileTypeFormData = (data) => {
    switch (data[DAM_ASSETS_FIELD_KEY.FILE_EXTENTION]) {
      case 'xlsx':
        return '/assets/images/xlsx.svg';
      case 'docx':
        return '/assets/images/word.svg';
      case 'pptx':
        return '/assets/images/pdf.svg';
      default:
        return '/assets/images/file_default.svg';
    }
  };
}

const utils = new HomeUtils();

export default utils;
