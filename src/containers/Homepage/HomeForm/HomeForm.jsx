/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';

import PAGE_STATUS from '../../../constants/PageStatus';
import { withTranslation } from 'react-i18next';
import Spinner from '../../../components/Spinner';
import { renderingGroupFieldHandler } from '../../../utils/form';
import {
  DAM_ASSETS_API_FIELD_KEY,
  DAM_ASSETS_FIELD_KEY,
} from 'aesirx-dma-lib/src/Constant/DamConstant';
import Button from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

class ProjectForm extends Component {
  formPropsData = {
    [DAM_ASSETS_FIELD_KEY.NAME]: '',
    [DAM_ASSETS_FIELD_KEY.COLLECTION_ID]: '',
    [DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]: '',
    [DAM_ASSETS_FIELD_KEY.FILE_SIZE]: '',
    [DAM_ASSETS_FIELD_KEY.TYPE]: '',
    [DAM_ASSETS_FIELD_KEY.LAST_MODIFIED]: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.viewModel = this.props.viewModel;

    this.viewModel.setForm(this);
  }

  generateFormSetting = () => {
    const { t } = this.props;
    return [
      {
        fields: [
          {
            label: t('txt_project_name'),
            key: DAM_ASSETS_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.NAME] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },

          {
            label: t('txt_project_name'),
            key: DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
          {
            label: t('txt_project_name'),
            key: DAM_ASSETS_FIELD_KEY.TYPE,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.TYPE],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.TYPE] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
          {
            label: t('txt_project_name'),
            key: DAM_ASSETS_FIELD_KEY.FILE_SIZE,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.FILE_SIZE],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[DAM_ASSETS_FIELD_KEY.FILE_SIZE] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Name');
              }
            },
          },
          {
            label: t('txt_project_name'),
            key: DAM_ASSETS_FIELD_KEY.LAST_MODIFIED,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[DAM_ASSETS_FIELD_KEY.LAST_MODIFIED],
            required: true,
            validation: 'required',
            changed: (event) => {
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

  populatingFormDataHandler = (data) => {
    if (!data) return false;

    this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME] = data.getName().value;
    this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE] = data.getOriginalStartDate();
    this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE] = data.getOriginalEndDate();
    this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO] = data.getLogoUrlValue();
    this.formPropsData[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION] =
      data.getShortDescriptionValue();
  };

  onDrop = (files) => {
    this.setState({ files });
  };

  render() {
    const { formStatus, homeEditdata, editMode } = this.viewModel;

    if (editMode) {
      this.populatingFormDataHandler(homeEditdata);
    }

    if (formStatus === PAGE_STATUS.LOADING) {
      return <Spinner />;
    }

    const formSetting = this.generateFormSetting();
    const { t } = this.props;
    return (
      <>
        <div className="row">
          <div className="col-8"></div>
          <div className="col-4">
            {Object.keys(formSetting)
              .map((groupIndex) => {
                return [...Array(formSetting[groupIndex])].map((group) => {
                  return renderingGroupFieldHandler(group, this.props.validator);
                });
              })
              .reduce((arr, el) => {
                return arr.concat(el);
              }, [])}
            <Button onClick={this.updateDetail} className="btn btn-success w-100">
              <span>
                {editMode === false || editMode == null
                  ? t('txt_create_project')
                  : t('txt_save_project')}
              </span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation('common')(ProjectForm);
