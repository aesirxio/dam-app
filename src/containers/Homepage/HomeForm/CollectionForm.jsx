/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';

import { DAM_ASSETS_FIELD_KEY, DAM_COLLECTION_FIELD_KEY } from 'aesirx-dma-lib';
import Button from 'components/Button';
import { withTranslation } from 'react-i18next';
import Spinner from '../../../components/Spinner';
import PAGE_STATUS from '../../../constants/PageStatus';
import { renderingGroupFieldHandler } from '../../../utils/form';

class HomeForm extends Component {
  formPropsData = {
    [DAM_COLLECTION_FIELD_KEY.NAME]: 'New Folder',
  };

  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.viewModel = props.viewModel;
    this.formPropsData = {
      [DAM_COLLECTION_FIELD_KEY.NAME]:
        props.type === 'create' && this.viewModel
          ? 'New Folder'
          : this.viewModel?.damEditdata?.[DAM_COLLECTION_FIELD_KEY.NAME] ?? '',
    };
  }

  generateFormSetting = () => {
    // const { t } = this.props;
    return [
      {
        fields: [
          {
            key: DAM_ASSETS_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME],
            validation: 'required',
            className: 'col-12',
            changed: (event) => {
              this.formPropsData[DAM_COLLECTION_FIELD_KEY.NAME] = event.target.value;
            },
            onKeyDown: (e) => {
              if (e.keyCode === 13) {
                this.props.onSubmit(this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME]);
              }
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
    const { formStatus } = this.viewModel;

    if (formStatus === PAGE_STATUS.LOADING) {
      return <Spinner />;
    }

    const formSetting = this.generateFormSetting();
    const { t } = this.props;
    return (
      <>
        <div className="row pb-3 h-100">
          <div className="col-12 h-100">
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
              <div className="col-3">
                <Button
                  text={t('txt_Cancel')}
                  onClick={this.props.close}
                  className="btn btn-outline-gray-300 bg-white text-blue-0 w-100"
                />
              </div>
              <div className="col-3">
                <Button
                  text={this.props.type === 'create' ? t('txt_create') : t('txt_save')}
                  onClick={() => this.props.onSubmit(this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME])}
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
