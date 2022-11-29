/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React from 'react';
import Dropzone from 'components/Dropzone';
import { Component } from 'react';
import './index.scss';
import { withTranslation } from 'react-i18next';
import Button from 'components/Button';

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
              <p className="fs-4 fw-semibold">{t('txt_drop_files_anywhere_to_upload')}</p>
              <p className="fs-5">{t('txt_or')}</p>
              <Dropzone noDrag={false} createAssets={createAssets}>
                <Button
                  className="text-gray-900 fw-semibold bg-white btn-white border mx-auto w-248"
                  text="txt_select_file"
                />
              </Dropzone>
            </div>
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default withTranslation('common')(ComponentNoData);
