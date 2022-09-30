/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { useDropzone } from 'react-dropzone';

// import ComponentImage from '../ComponentImage';

const Dropzone = ({ children, noClick, createAssets, className }) => {
  const { getRootProps, getInputProps } = useDropzone({
    // accept: '*',
    noClick: noClick,
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDrop: (acceptedFiles) => {
      // console.log(acceptedFiles);
      // setFile(URL.createObjectURL(acceptedFiles[0]));
      createAssets(acceptedFiles[0]);
    },
  });

  return (
    <div className={`position-relative ${className ?? 'w-100 h-100'}`}>
      <div {...getRootProps()} className="cursor-auto w-100 h-100">
        <input
          {...getInputProps()}
          className="position-absolute start-0 top-0 bottom-0 end-0 cursor-auto"
        />
        {/* <div className="d-flex align-items-center p-3">
          <i className="fs-1 text-blue-0 opacity-25">
            <FontAwesomeIcon icon={faCloudUploadAlt} />
          </i>
          <div className="text-center ms-1">
            <p className="mb-0 ms-2">
              <strong>Choose file</strong>
            </p>
          </div>
        </div> */}
        {children}
      </div>
      {/* <div key={field.value} className="text-center">
        <ComponentImage src={file} alt={field.value} />
      </div> */}
    </div>
  );
};

export default Dropzone;
