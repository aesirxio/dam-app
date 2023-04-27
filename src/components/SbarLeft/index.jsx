/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';

import './index.scss';
import Menu from '../Menu';
import Menu2 from 'components/Menu2';
import { withRouter } from 'react-router-dom';
import { settingRoutes } from 'routes/routes';
import { SbarLeft as AesirXSbarLeft } from 'aesirx-uikit';

class SbarLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    const { match } = this.props;

    const has = settingRoutes.find((router) => router.path === match.path);

    return (
      <AesirXSbarLeft>
        {!has ? (
          <>
            <Menu />
          </>
        ) : (
          <Menu2 />
        )}
      </AesirXSbarLeft>
    );
  }
}

export default withTranslation()(withRouter(SbarLeft));
