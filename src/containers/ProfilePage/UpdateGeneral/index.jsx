/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { observer } from 'mobx-react';
import { Component } from 'react';

import { Storage } from 'aesirx-lib';

import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import FormComponent from '../../../components/Form';
import { Spinner } from 'aesirx-uikit';
import { FORM_FIELD_TYPE } from 'aesirx-uikit';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';
import '../index.scss';
import SubmitButton from '../Layout/SubmitButton';
import { witheProfileViewModel } from '../ProfileViewModel/ProfileViewModelContextProvider';
import AvatarDAM from '../Layout/AvatarDAM';
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
      this.validator = new SimpleReactValidator();
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

    saveGeneralHandler = async () => {
      await this.updateGeneralViewModel.saveGeneralInformationOnPage();
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('password');
    };

    validateInfoBeforeSending = async () => {
      if (this.validator.allValid()) {
        await this.saveGeneralHandler();
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

    avatarOnSelectHandler = (data) => {
      if (data.split(/[#?]/)[0].split('.').pop().trim() !== 'mp4') {
        this.setState({
          getUrlImage: data,
        });
        this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = data;
      }
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
                <div className="col-9">
                  <FormComponent
                    formClassName={'row h-100'}
                    generateFormSetting={() => this.generateFormSetting()}
                    formPropsData={this.formPropsData}
                    viewModel={this.updateGeneralViewModel}
                    key={Math.random(40, 200)}
                    validator={this.validator}
                  />
                </div>

                <div className="col-3">
                  <AvatarDAM
                    formPropsData={this.formPropsData}
                    avatarOnSelectHandler={this.avatarOnSelectHandler}
                  />
                </div>
                <SubmitButton validateInfoBeforeSending={this.validateInfoBeforeSending} />
              </div>
            </div>
          )}
        </>
      );
    }
  }
);

export default withTranslation()(witheProfileViewModel(UpdateGeneral));
