/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';

import Xlsx from '../../public/assets/images/xlsx.svg';
import Word from '../../public/assets/images/word.svg';
import Pdf from '../../public/assets/images/pdf.svg';
import FileDefault from '../../public/assets/images/file_default.svg';

class HomeUtils {
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

const utils = new HomeUtils();

export default utils;
