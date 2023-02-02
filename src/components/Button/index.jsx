/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ComponentImage from '../ComponentImage';
import styles from './index.module.scss';
import { withTranslation } from 'react-i18next';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleClick = async () => {
    if (this.props.onClick) {
      this.setState({
        loading: true,
      });
      const click = await this.props.onClick();
      click();
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    let { icon, text, className, image, disabled, svg } = this.props;

    if (className !== undefined && styles[className] !== undefined) {
      className = styles[className];
    }
    const { t } = this.props;
    return (
      <button
        type="button"
        className={`d-flex justify-content-center btn ${className}`}
        onClick={this.handleClick}
        disabled={disabled || this.state?.loading}
      >
        {icon && (
          <i className="pe-1">
            <FontAwesomeIcon icon={icon} />
          </i>
        )}
        {image && <ComponentImage alt={text} src={image} className="pe-1" />}
        {svg ? svg : null}
        <span className="ms-1 text-nowrap d-flex align-items-center">
          {t(text)}
          {this.state?.loading && (
            <span className={`ms-1 spinner-border text-body ${styles.loading}`} role="status">
              <span className="visually-hidden">Loading...</span>
            </span>
          )}
        </span>
      </button>
    );
  }
}

export default withTranslation('common')(Button);
