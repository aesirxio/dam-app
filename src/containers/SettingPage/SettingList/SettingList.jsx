/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import Button from 'components/Button';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { renderingGroupFieldHandler } from 'utils/form';
import { notify } from 'components/Toast';
import { DAM_SUBSCIPTION_FIELD_KEY } from 'aesirx-dma-lib';

const SettingList = observer(
  class SettingList extends Component {
    damListViewModel = null;

    formPropsData = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.state = {
        loading: false,
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.damListViewModel = this.viewModel ? this.viewModel.damListViewModel : null;
      this.formPropsData = {
        storage: {
          label: 'AesirX',
          value: 'aesirx',
        },
        key: '',
        secret: null,
        region: null,
        bucket: null,
      };
    }

    generateFormSetting = () => {
      const { t } = this.props;
      this.formPropsData = {
        ...this.formPropsData,
        key:
          this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
            DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_OPTION
          ]?.plugin_params?.key ?? '',
        secret:
          this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
            DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_OPTION
          ]?.plugin_params?.secret ?? '',
        region:
          this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
            DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_OPTION
          ]?.plugin_params?.region ?? '',
        bucket:
          this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
            DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_OPTION
          ]?.plugin_params?.bucket ?? '',
      };
      if (this.formPropsData?.storage?.value === 'aws') {
        return [
          {
            fields: [
              {
                label: t('txt_storage'),
                key: 'storage',
                type: FORM_FIELD_TYPE.SELECTION,
                getValueSelected: this.formPropsData?.storage,
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
                handleChange: (data) => {
                  this.formPropsData.storage = data;
                  this.forceUpdate();
                },
              },
              {
                label: t('txt_client_id'),
                key: 'key',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.formPropsData?.key,
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
                value: this.formPropsData?.secret,
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
                value: this.formPropsData?.region,
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
                value: this.formPropsData?.bucket,
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
              getValueSelected: this.formPropsData?.storage,
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
      let formpropsdata = {};
      Object.keys(this.formPropsData).forEach((index) => {
        if (this.formPropsData[index]) {
          formpropsdata[index] = this.formPropsData[index];
        }
      });
      delete formpropsdata.storage;
      if (this.formPropsData.storage?.value === 'aws') {
        const data = {
          id: this.damListViewModel.subscription?.[0]?.id,
          store: [
            {
              type: 'product-aesirx-dam',
              options: {
                plugin: 'aws',
                plugin_use: 'override',
                plugin_params: {
                  ...formpropsdata,
                },
              },
            },
          ],
        };
        const response = this.damListViewModel.damStore.updateSubscription(data);
        if (response) {
          notify('Success', 'success');
        }
      } else {
        const data = {
          id: this.damListViewModel.subscription?.[0]?.id,
          store: [
            {
              type: 'product-aesirx-dam',
              options: {
                plugin: 'inherit',
                plugin_use: 'inherit',
              },
            },
          ],
        };
        const response = this.damListViewModel.damStore.updateSubscription(data);
        if (response) {
          notify('Success', 'success');
        } else {
          notify('error', 'something wrong!');
        }
      }
    };

    componentDidMount() {}

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
