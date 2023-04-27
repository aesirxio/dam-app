import React from 'react';

import ComponentImage from 'components/ComponentImage';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-lib';
import styles from './index.module.scss';
const ThumbsDragPreview = ({ thumbs }) => {
  return (
    <div>
      {thumbs.length ? (
        thumbs.slice(0, 3).map((thumb, i) => (
          <div
            key={thumb.id}
            className="d-flex align-items-center"
            style={{
              zIndex: thumbs.length - i,
              transform: `rotateZ(${-i * 2.5}deg)`,
            }}
          >
            <ComponentImage
              alt={thumb.name}
              src={
                thumb?.[DAM_ASSETS_FIELD_KEY.TYPE]
                  ? thumb?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]
                  : '/assets/images/folder.svg'
              }
              wrapperClassName={styles.image_thumb}
            />
            <span className="ps-1"> {thumb.name}</span>
          </div>
        ))
      ) : (
        <div className="">File</div>
      )}
    </div>
  );
};

export default ThumbsDragPreview;
