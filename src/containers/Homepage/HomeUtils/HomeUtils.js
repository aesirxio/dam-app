/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';

// import HomeModel from '../HomeModel/HomeModel';

class HomeUtils {
  transformPersonaResponseIntoModel = (response) => {
    // return Object.keys(response)
    //   .map((index) => {
    //     return [...Array(response[index])].map((item) => {
    //       return new HomeModel(item);
    //     });
    //   })
    //   .reduce((arr, el) => {
    //     return arr.concat(el);
    //   }, []);
    return response;
  };

  checkFileTypeFormData = (data) => {
    switch (data[DAM_ASSETS_FIELD_KEY.FILE_EXTENTION]) {
      case 'xlsx':
        return '/assets/images/xlsx.svg';
        break;
      case 'docx':
        return '/assets/images/word.svg';
        break;
      case 'pptx':
        return '/assets/images/pdf.svg';
        break;
      default:
        return '/assets/images/file_default.svg';
        break;
    }
  };
}

const utils = new HomeUtils();

export default utils;
