/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';
import { withThemeContext } from 'themes/ThemeContextProvider';
import { withTranslation } from 'react-i18next';

import styles from './index.module.scss';
class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    const { t } = this.props;
    let { isBorder, async, placeholder, isShadow, isBackGround } = this.props;
    let customStyle = customStyles(isBorder, isShadow, isBackGround);
    if (async) {
      return (
        <AsyncSelect
          {...this.props}
          placeholder={placeholder ?? t('txt_select...')}
          styles={customStyle}
        />
      );
    }

    return (
      <Select
        {...this.props}
        className={`${this.props.className}  ${styles.custom}`}
        placeholder={placeholder ?? t('txt_select...')}
        styles={customStyle}
      />
    );
  }
}

SelectComponent.defaultProps = {
  async: false,
  isMulti: false,
};
export default withTranslation('common')(withThemeContext(SelectComponent));
