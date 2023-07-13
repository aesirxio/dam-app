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
        return '/assets/images/pdf.svg';
      default:
        return '/assets/images/file_default.svg';
    }
  };

  convertImageEditortoFile = async (damEditdata, formPropsData, editorRef) => {
    if (damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] === 'image') {
      console.log(damEditdata, { format: damEditdata?.[DAM_ASSETS_FIELD_KEY.FILE_EXTENTION] });
      const editorInstance = editorRef.current.getInstance();
      const image = await fetch(
        editorInstance.toDataURL({ format: damEditdata?.[DAM_ASSETS_FIELD_KEY.FILE_EXTENTION] })
      );

      const fileImage = await image.blob();
      formPropsData[DAM_ASSETS_FIELD_KEY.FILE] = new File(
        [fileImage],
        damEditdata?.[DAM_ASSETS_FIELD_KEY.NAME]
      );

      console.log(formPropsData);
    }

    return formPropsData;
  };
}

const utils = new HomeUtils();

export default utils;
