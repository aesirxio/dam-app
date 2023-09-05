/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { DAM_ASSETS_FIELD_KEY, DAM_COLLECTION_FIELD_KEY } from 'aesirx-lib';
import {
  Spinner,
  Button,
  FORM_FIELD_TYPE,
  renderingGroupFieldHandler,
  PAGE_STATUS,
  Image,
} from 'aesirx-uikit';
import { withTranslation } from 'react-i18next';

import moment from 'moment';

import ImageEditorComponent from 'components/ImageEditor';
import utils from '../HomeUtils/HomeUtils';

class HomeForm extends Component {
  editorRef = React.createRef();

  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.viewModel = this.props.viewModel;

    this.formPropsData = {
      [DAM_ASSETS_FIELD_KEY.NAME]: this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.NAME],
      [DAM_ASSETS_FIELD_KEY.COLLECTION_ID]:
        this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.COLLECTION_ID],
      [DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]:
        this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
      [DAM_ASSETS_FIELD_KEY.FILE_SIZE]:
        this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.FILE_SIZE] ??
        this.props.viewModel.damEditdata?.[DAM_COLLECTION_FIELD_KEY.FILE_SIZE],
      [DAM_ASSETS_FIELD_KEY.TYPE]: this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE],
      [DAM_ASSETS_FIELD_KEY.LAST_MODIFIED]: this.props.viewModel.damEditdata?.modified_date_org,
      [DAM_ASSETS_FIELD_KEY.DESCRIPTION]:
        this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.DESCRIPTION],
      [DAM_ASSETS_FIELD_KEY.KEYWORDS]:
        this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.KEYWORDS],
      [DAM_ASSETS_FIELD_KEY.TAGS]: this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TAGS],
    };
  }

  handleOnSubmit = () => {
    if (this.validator.allValid()) {
      this.formPropsData = utils.convertImageEditortoFile(
        this.props.viewModel.damEditdata,
        this.formPropsData,
        this.editorRef
      );

      this.props.handleUpdate(this.formPropsData);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  generateFormSetting = () => {
    const { t } = this.props;
    return [
      {
        fields: [
          {
            label: t('txt_title'),
            key: DAM_ASSETS_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME],
            validation: 'required',
            required: true,
            className: 'col-12',
            inputClassName: 'border bg-transparent fs-sm text-gray-dark',
            handleChange: (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME] = event.target.value;
              this.forceUpdate();
            },
            blurred: () => {
              this.validator.showMessageFor(t('txt_title'));
            },
          },
          {
            label: t('txt_url'),
            key: DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL,
            disabled: true,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
            className: `col-12  ${
              this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] ? '' : 'd-none'
            }`,
            inputClassName: 'border bg-transparent fs-sm text-gray-dark',
          },
          {
            label: t('txt_file_type'),
            key: DAM_ASSETS_FIELD_KEY.TYPE,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.TYPE],
            disabled: true,
            className: `col-6 file_type ${
              this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] ? '' : 'd-none'
            }`,
            inputClassName: 'bg-transparent border-0 p-0 text-gray-dark',
          },
          {
            label: t('txt_file_size'),
            key: DAM_ASSETS_FIELD_KEY.FILE_SIZE,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.FILE_SIZE] + ' kb',
            disabled: true,
            className: 'col-6 file_size',
            inputClassName: 'bg-transparent border-0 p-0 text-gray-dark',
          },
          {
            label: t('txt_dimension'),
            disabled: true,
            type: FORM_FIELD_TYPE.INPUT,
            value: ' ',
            className: 'col-6 dimension ',
            inputClassName: 'bg-transparent border-0 p-0 text-gray-dark',
          },
          {
            label: t('txt_last_modified'),
            key: DAM_ASSETS_FIELD_KEY.LAST_MODIFIED,
            type: FORM_FIELD_TYPE.INPUT,
            value:
              this.formPropsData[DAM_ASSETS_FIELD_KEY.LAST_MODIFIED] &&
              moment(this.formPropsData[DAM_ASSETS_FIELD_KEY.LAST_MODIFIED]).format('DD MMM, YYYY'),
            disabled: true,
            className: 'col-6 last_modified ',
            inputClassName: 'bg-transparent border-0 p-0 text-gray-dark',
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

    console.log('formSetting', formSetting);
    return (
      <>
        <div className="row pb-3 h-100">
          <div className="col-lg-9 col-12 ">
            <div className={`d-flex align-items-center justify-content-center h-100 `}>
              {!this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] ? (
                <Image
                  wrapperClassName="h-50 w-50"
                  className="h-100 w-100 object-fit-contain"
                  src={'/assets/images/folder-big.png'}
                />
              ) : this.props.viewModel.damEditdata?.[DAM_ASSETS_FIELD_KEY.TYPE] === 'image' ? (
                <ImageEditorComponent
                  editorRef={this.editorRef}
                  damEditdata={this.props.viewModel.damEditdata}
                />
              ) : (
                <Image
                  wrapperClassName="h-50 w-50"
                  className="h-100 w-100 object-fit-contain"
                  src={utils.checkFileTypeFormData(this.props.viewModel.damEditdata)}
                />
              )}
            </div>
          </div>
          <div className="col-lg-3 col-12 h-auto d-flex flex-column">
            <div className="row mb-auto">
              {Object.keys(formSetting)
                .map((groupIndex) => {
                  return [...Array(formSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, this.validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </div>
            <div className="row justify-content-end pt-5">
              <div className="col-xxl-4 col-xl-5 col-6">
                <Button
                  text={t('txt_Cancel')}
                  onClick={closeModal}
                  className="btn btn-outline-gray-300 bg-white text-blue-0 w-100"
                />
              </div>
              <div className="col-xxl-4 col-xl-5 col-6">
                <Button
                  text={t('txt_save_update')}
                  onClick={this.handleOnSubmit}
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

export default withTranslation()(HomeForm);
