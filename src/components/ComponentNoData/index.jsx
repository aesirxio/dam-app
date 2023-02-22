/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React, { Component } from 'react';
import Dropzone from 'components/Dropzone';

import { withTranslation } from 'react-i18next';

class ComponentNoData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, createAssets, t } = this.props;
    return (
      <div
        className={
          className
            ? className
            : 'text-center h-100 d-flex flex-column justify-content-center align-items-center'
        }
      >
        <Dropzone isBtn={false} noDrag={false} createAssets={createAssets} noClick={true}>
          <div className="d-flex align-items-center justify-content-center h-100 w-100">
            <div>
              <p className="fs-4 text-blue-6 fw-semibold">
                {t('txt_drop_files_anywhere_to_upload')}
              </p>
              <p className="fs-5 text-gray">{t('txt_or')}</p>
              <Dropzone noDrag={true} isBtn={true} createAssets={createAssets}>
                <p className="text-blue-6 btn fw-semibold bg-white btn-white border mx-auto w-248">
                  {t('txt_select_file')}
                </p>
              </Dropzone>
            </div>
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default withTranslation('common')(ComponentNoData);
