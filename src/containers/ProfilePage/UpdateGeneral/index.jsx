/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { observer } from 'mobx-react';
import { Component } from 'react';

import { Storage } from 'aesirx-dma-lib';
import 'react-datepicker/dist/react-datepicker.css';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import FormComponent from '../../../components/Form';
import Spinner from '../../../components/Spinner';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';
import '../index.scss';
import SubmitButton from '../Layout/SubmitButton';
import { witheProfileViewModel } from '../ProfileViewModel/ProfileViewModelContextProvider';
` `;

const UpdateGeneral = observer(
  class UpdateGeneral extends Component {
    updateGeneralViewModel = null;
    formPropsData = {
      [UPDATE_GENERAL_FIELD_KEY.ID]: Storage.getItem('member_id'),
      [UPDATE_GENERAL_FIELD_KEY.USERNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]: '',
      [UPDATE_GENERAL_FIELD_KEY.FULLNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.EMAIL]: '',
      [UPDATE_GENERAL_FIELD_KEY.BIRTHDAY]: '',
      [UPDATE_GENERAL_FIELD_KEY.PHONE]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS_2]: '',
      [UPDATE_GENERAL_FIELD_KEY.ZIPCODE]: '',
      [UPDATE_GENERAL_FIELD_KEY.CITY]: '',
      [UPDATE_GENERAL_FIELD_KEY.STATE]: '',
      [UPDATE_GENERAL_FIELD_KEY.COUNTRY]: '',
      [UPDATE_GENERAL_FIELD_KEY.TIMEZONE]: '',
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        getUrlImage: '',
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      const { viewModel } = props;
      this.updateGeneralViewModel = viewModel ? viewModel.getUpdateGeneralViewModel() : null;
      this.updateGeneralViewModel.setForm(this);
    }

    componentDidMount() {
      this.updateGeneralViewModel.initializeData();
    }

    handleDamAssets = (data) => {
      if (data[0].extension !== 'mp4') {
        this.setState({
          getUrlImage: data,
        });
        this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = data[0].url;
      }
    };

    saveGeneralHandler = () => {
      this.updateGeneralViewModel.saveGeneralInformationOnPage();
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('password');
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        console.log(this.validator);
        console.log(123);
        this.setState({ loading: true });
        // this.saveGeneralHandler();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
        return false;
      }
    };

    clearImage = (defaultImage) => {
      this.setState({
        getUrlImage: '',
      });
      this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = defaultImage;
    };

    generateFormSetting = () => {
      return [
        {
          fields: [
            {
              label: 'txt_Username',
              key: UPDATE_GENERAL_FIELD_KEY.USERNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME],
              className: 'col-6',
              inputClassName: 'border',
              readOnly: true,
            },
            {
              label: 'txt_Email',
              key: UPDATE_GENERAL_FIELD_KEY.EMAIL,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.EMAIL],
              className: 'col-6',
              inputClassName: 'border',
              readOnly: true,
            },

            {
              label: 'txt_Fullname',
              key: UPDATE_GENERAL_FIELD_KEY.FULLNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME],
              className: 'col-6',
              required: true,
              validation: 'required',
              inputClassName: 'border',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME] = event.target.value;
              },
            },
            {
              label: 'txt_Phone',
              key: UPDATE_GENERAL_FIELD_KEY.PHONE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE],
              className: 'col-6',
              inputClassName: 'border',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE] = event.target.value;
              },
            },
          ],
        },
      ];
    };
    render() {
      const { memberInfo } = this.updateGeneralViewModel;
      return (
        <>
          {!memberInfo ? (
            <Spinner />
          ) : (
            <div className="bg-white p-3 rounded-3">
              <div className="row">
                <FormComponent
                  formClassName={'col-9 row'}
                  generateFormSetting={() => this.generateFormSetting()}
                  formPropsData={this.formPropsData}
                  viewModel={this.updateGeneralViewModel}
                  key={Math.random(40, 200)}
                />

                {/* <AvatarDAM>
                  <div
                    className={`position-relative  cursor-pointer wr_upload_images ${
                      getUrlImage.length > 0 ? 'active_img' : ''
                    }`}
                  >
                    {!getUrlImage ? (
                      <div className="wr_img_thumbnail_dam position-relative m-2 ">
                        <ComponentImage
                          className={`rounded-circle them imgTab h-196`}
                          src={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]}
                          alt={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME]}
                        />
                        <div className="position-absolute top-50 start-0 align-content-center fw-bold text-white imgcloud ">
                          <FontAwesomeIcon icon={faCloudUploadAlt} className="d-block m-auto  " />
                          <span className=" mx-3 my-5">Click to change image</span>
                        </div>
                      </div>
                    ) : null}
                    <div className="main_upload_images">
                      <Button data={getUrlImage} changed={(data) => this.handleDamAssets(data)} />
                    </div>
                    {getUrlImage ? (
                      <div
                        onClick={() => this.clearImage(memberInfo.avatar_dam)}
                        className={'clear_image_button'}
                      >
                        <FontAwesomeIcon icon={faTimesCircle} className="text-white" />
                      </div>
                    ) : null}
                  </div>
                </AvatarDAM> */}
                <SubmitButton validateInfoBeforeSending={this.validateInfoBeforeSending} />
              </div>
            </div>
          )}
        </>
      );
    }
  }
);

export default withTranslation('common')(witheProfileViewModel(UpdateGeneral));
