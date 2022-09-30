/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React from 'react';
import Dropzone from 'components/Dropzone';
import { Component } from 'react';
import './index.scss';

class ComponentNoData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, createAssets } = this.props;
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
        <Dropzone createAssets={createAssets} noClick={false}>
          asd
        </Dropzone>
      </div>
    );
  }
}

export default ComponentNoData;
