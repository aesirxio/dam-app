/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_FIELD_KEY } from 'aesirx-lib';

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
        return '/assets/images/pptx.svg';
      case 'pdf':
        return '/assets/images/pdf.svg';
      default:
        return '/assets/images/file_default.svg';
    }
  };

  convertImageEditortoFile = (damEditdata, formPropsData, editorRef) => {
    if (damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] === 'image') {
      const editorInstance = editorRef.current.getInstance();

      formPropsData[DAM_ASSETS_FIELD_KEY.FILE] = this.dataURLtoFile(
        editorInstance.toDataURL({ format: damEditdata?.[DAM_ASSETS_FIELD_KEY.FILE_EXTENTION] }),
        damEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
      );
    }

    return formPropsData;
  };

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}

const utils = new HomeUtils();

export default utils;
