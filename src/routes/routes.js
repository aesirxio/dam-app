/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

const LoginPage = lazy(() => import('../containers/LoginPage'));
const DashboardPage = lazy(() => import('../containers/Homepage'));
const SettingPage = lazy(() => import('containers/SettingPage'));
const ProfilePage = lazy(() => import('../containers/ProfilePage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
  },
];

const mainRoutes = [
  {
    path: ['/', '/root', '/root/*'],
    exact: true,
    main: () => <DashboardPage />,
  },
  {
    path: ['/setting', '/setting/configuration'],
    exact: true,
    main: () => <SettingPage />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: ({ match, location }) => <ProfilePage match={match} location={location} />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
