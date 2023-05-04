/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import { LoginPage, ProfilePage } from 'aesirx-uikit';

const DashboardPage = lazy(() => import('../containers/Homepage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage text="DAM" />,
  },
];

const mainRoutes = [
  {
    path: ['/', '/root', '/root/*'],
    exact: true,
    main: () => <DashboardPage />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: () => <ProfilePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
