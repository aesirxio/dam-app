/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';

import {
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-dma-lib/src/Constant/DamConstant';
import Button from 'components/Button';
import ComponentImage from 'components/ComponentImage';
import { withTranslation } from 'react-i18next';
import Spinner from '../../../components/Spinner';
import PAGE_STATUS from '../../../constants/PageStatus';
import { renderingGroupFieldHandler } from '../../../utils/form';
import utils from '../HomeUtils/HomeUtils';
import styles from '../index.module.scss';
class HomeForm extends Component {
  formPropsData = {
    [DAM_ASSETS_FIELD_KEY.NAME]         : this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.NAME],
    [DAM_ASSETS_FIELD_KEY.COLLECTION_ID]: 
      this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.COLLECTION_ID],
    [DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]: 
      this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
    [DAM_ASSETS_FIELD_KEY.FILE_SIZE]: 
      this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.FILE_SIZE] ??
      this.props.viewModel.damEditdata?.[DAM_COLLECTION_FIELD_KEY.FILE_SIZE],
    [DAM_ASSETS_FIELD_KEY.TYPE]         : this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE],
    [DAM_ASSETS_FIELD_KEY.LAST_MODIFIED]: 
      this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.LAST_MODIFIED],
  };

  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.viewModel = this.props.viewModel;
  }

  generateFormSetting = () => {
    const { t } = this.props;
    return [
      {
        fields: [
          {
            label     : t('txt_title'),
            key       : DAM_ASSETS_FIELD_KEY.NAME,
            type      : FORM_FIELD_TYPE.INPUT,
            value     : this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME],
            required  : true,
            validation: 'required',
            className : 'col-12',
            changed   : (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
          {
            label    : t('txt_url'),
            key      : DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL,
            disabled : true,
            type     : FORM_FIELD_TYPE.INPUT,
            value    : this.formPropsData[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
            className: `col-12 ${
              this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] ? '': 'd-none'
            }`,
            validation: 'required',
            changed   : (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
          {
            label    : t('txt_file_type'),
            key      : DAM_ASSETS_FIELD_KEY.TYPE,
            type     : FORM_FIELD_TYPE.INPUT,
            value    : this.formPropsData[DAM_ASSETS_FIELD_KEY.TYPE],
            disabled : true,
            className: `col-6 ${
              this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] ? '': 'd-none'
            }`,
            validation: 'required',
            changed   : (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.TYPE] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
          {
            label     : t('txt_file_size'),
            key       : DAM_ASSETS_FIELD_KEY.FILE_SIZE,
            type      : FORM_FIELD_TYPE.INPUT,
            value     : this.formPropsData[DAM_ASSETS_FIELD_KEY.FILE_SIZE],
            disabled  : true,
            className : 'col-6',
            validation: 'required',
            changed   : (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.FILE_SIZE] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
          {
            label     : t('txt_last_modified'),
            key       : DAM_ASSETS_FIELD_KEY.LAST_MODIFIED,
            type      : FORM_FIELD_TYPE.INPUT,
            value     : this.formPropsData[DAM_ASSETS_FIELD_KEY.LAST_MODIFIED],
            disabled  : true,
            className : 'col-6',
            validation: 'required',
            changed   : (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.LAST_MODIFIED] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
        ],
      },
    ];
  };

  render() {
    const { formStatus, closeModal } = this.viewModel;

    if (formStatus === PAGE_STATUS.LOADING) {
      return <Spinner />;
    }

    const formSetting = this.generateFormSetting();
    const { t } = this.props;
    return (
      <>
        <div className="row pb-3 h-100">
          <div className="col-8 h-100">
            <div className="h-100 ">
              <Button
                text={t('txt_delete')}
                onClick={this.props.delete}
                className="btn-outline-danger mb-3 "
              />
              <div
                className={`d-flex align-items-center justify-content-center ${styles.popupImageHeight}`}
              >
                {!this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] ? (
                  <ComponentImage
                    wrapperClassName="h-100 w-100"
                    className="h-100 w-100 object-fit-contain"
                    src={'/assets/images/folder-big.png'}
                  />
                ) : this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] === 'image' ? (
                  <ComponentImage
                    wrapperClassName="h-100 w-100"
                    className="h-100 w-100 object-fit-contain"
                    src={this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]}
                  />
                ) : (
                  <ComponentImage
                    wrapperClassName="h-100 w-100"
                    className="h-100 w-100 object-fit-contain"
                    src={utils.checkFileTypeFormData(this.props.viewModel.damEditdata)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-4 h-100">
            <div className="row">
              {Object.keys(formSetting)
                .map((groupIndex) => {
                  return [...Array(formSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, this.props.validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </div>
            <div className="row justify-content-end">
              <div className="col-4">
                <Button
                  text={t('txt_Cancel')}
                  onClick={closeModal}
                  className="btn btn-outline-gray-300 text-blue-0 w-100"
                />
              </div>
              <div className="col-4">
                <Button
                  text={t('txt_save_update')}
                  onClick={() => this.props.handleUpdate(this.formPropsData)}
                  className="btn btn-success w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation('common')(HomeForm);
