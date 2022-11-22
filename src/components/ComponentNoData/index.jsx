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
        {/* <p
          style={{ width: '48px', height: '48px' }}
          className={`mb-2 d-inline-block position-relative rounded-circle ${iconBg}`}
        >
          <ComponentImage
            className={`position-absolute top-50 start-50 translate-middle ${iconColor}`}
            src={icons}
            alt={icons}
          />
        </p>
        <h5 className="mb-2">{title}</h5>
        <p className={`mb-2 fs-14 text-black-50 w-100 mx-auto ${width}`}>{text}</p>
        {isBtn && (
          <Link
            to={{ pathname: link, state: { openModal: true } }}
            className="btn btn-success d-inline-block w-fit"
          >
            <i className="text-white me-2">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            {linlText}
          </Link>
        )} */}
        <Dropzone isBtn={false} noDrag={false} createAssets={createAssets} noClick={false}>
          <div className="d-flex align-items-center justify-content-center h-100 w-100">
            <div>
              <p>{t('txt_drop_files_anywhere_to_upload')}</p>
              <p>{t('txt_or')}</p>
              <Button
                className="text-dark bg-white btn-white border w-100"
                text="txt_select_file"
              />
            </div>
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default withTranslation('common')(ComponentNoData);
