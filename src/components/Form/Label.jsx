/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
class Label extends React.Component {
  render() {
    let { text, required, className } = this.props;
    const { t } = this.props;
    return text ? (
      <Form.Label className={className ? className : 'mb-2 w-100 text-gray-dark fw-semibold'}>
        {t(text)}
        {required && <span className="text-red-1">*</span>}
      </Form.Label>
    ) : null;
  }
}

export default withTranslation('common')(Label);
