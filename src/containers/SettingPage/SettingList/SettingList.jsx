/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';

import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { withSettingViewModel } from '../SettingViewModel/SettingViewModelContextProvider';
import SimpleReactValidator from 'simple-react-validator';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { renderingGroupFieldHandler } from 'utils/form';
import Button from 'components/Button';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';

const SettingList = observer(
  class SettingList extends Component {
    damListViewModel = null;

    formPropsData = {
      storage: {
        label: 'AesirX',
        value: 'aesirx',
      },
      key: '',
      secret: '',
      region: '',
      bucket: '',
    };
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.damListViewModel = this.viewModel ? this.viewModel.damListViewModel : null;
    }

    generateFormSetting = () => {
      const { t } = this.props;
      if (this.formPropsData.storage?.value === 'aws') {
        return [
          {
            fields: [
              {
                label: t('txt_storage'),
                key: 'storage',
                type: FORM_FIELD_TYPE.SELECTION,
                getValueSelected: this.formPropsData.storage,
                getDataSelectOptions: [
                  {
                    label: 'AesirX',
                    value: 'aesirx',
                  },
                  {
                    label: 'AWS',
                    value: 'aws',
                  },
                ],
                required: true,
                validation: 'required',
                placeholder: 'https://testwp.R Digital',
                handleChange: (data) => {
                  this.formPropsData.storage = data;
                  this.forceUpdate();
                },
              },
              {
                label: t('txt_client_id'),
                key: 'key',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.formPropsData.key,
                required: true,
                validation: 'required',
                className: 'col-12',
                changed: (event) => {
                  this.formPropsData.key = event.target.value;
                },
                blurred: () => {
                  this.validator.showMessageFor('Name');
                },
              },
              {
                label: t('txt_client_secret'),
                key: 'secret',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.formPropsData.secret,
                required: true,
                validation: 'required',
                className: 'col-12',
                changed: (event) => {
                  this.formPropsData.secret = event.target.value;
                },
                blurred: () => {
                  this.validator.showMessageFor('Name');
                },
              },
              {
                label: t('txt_region'),
                key: 'region',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.formPropsData.region,
                required: true,
                validation: 'required',
                className: 'col-12',
                changed: (event) => {
                  this.formPropsData.region = event.target.value;
                },
                blurred: () => {
                  this.validator.showMessageFor('Name');
                },
              },
              {
                label: t('txt_bucket'),
                key: 'bucket',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.formPropsData.bucket,
                required: true,
                validation: 'required',
                className: 'col-12',
                changed: (event) => {
                  this.formPropsData.bucket = event.target.value;
                },
                blurred: () => {
                  this.validator.showMessageFor('Name');
                },
              },
            ],
          },
        ];
      }
      return [
        {
          fields: [
            {
              label: t('txt_storage'),
              key: 'storage',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.formPropsData.storage,
              getDataSelectOptions: [
                {
                  label: 'AesirX',
                  value: 'aesirx',
                },
                {
                  label: 'AWS',
                  value: 'aws',
                },
              ],
              required: true,
              validation: 'required',
              placeholder: 'https://testwp.R Digital',
              handleChange: (data) => {
                this.formPropsData.storage = data;
                this.forceUpdate();
              },
            },
          ],
        },
      ];
    };

    handleSubmit = () => {
      this.damListViewModel.damStore.updateSubscription();
    };

    render() {
      const formSetting = this.generateFormSetting();
      const { t } = this.props;
      return (
        <div className="bg-white shadow-sm p-4">
          {Object.keys(formSetting)
            .map((groupIndex) => {
              return [...Array(formSetting[groupIndex])].map((group) => {
                return renderingGroupFieldHandler(group, this.validator);
              });
            })
            .reduce((arr, el) => {
              return arr.concat(el);
            }, [])}
          <Button
            // icon={faChevronRight}
            text={t('txt_save_setting')}
            onClick={this.handleSubmit}
            className="btn btn-success ms-auto"
          />
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withDamViewModel(SettingList)));
