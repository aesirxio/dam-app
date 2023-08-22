import React, { useCallback, useRef } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';

export default function ImageEditorComponent({ editorRef, damEditdata }) {
  const myTheme = {
    'common.bi.image': '/assets/images/file.svg',
    'common.bisize.width': '21px',
    'loadButton.display': 'none',
  };

  const imageEditorOptions = {
    includeUI: {
      loadImage: {
        path: `${damEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]}?${moment(
          damEditdata[DAM_ASSETS_FIELD_KEY.LAST_MODIFIED]
        ).unix()}`,
        name: damEditdata?.[DAM_ASSETS_FIELD_KEY.NAME],
      },
      theme: myTheme,
      menuBarPosition: 'bottom',
    },
    cssMaxHeight: 500,
    cssMaxWidthL: 700,
    usageStatistics: false,
  };

  return <ImageEditor ref={editorRef} {...imageEditorOptions} />;
}
