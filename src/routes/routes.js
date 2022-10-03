/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { isLogin } from 'auth';

import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = lazy(() => import('../containers/LoginPage'));

const WelcomePage = lazy(() => import('../containers/WelcomePage'));
const DashboardPage = lazy(() => import('../containers/Homepage'));
const SettingPage = lazy(() => import('containers/SettingPage'));

const ProfilePage = lazy(() => import('../containers/ProfilePage'));

const authRoutes = [
  {
    path: '/',
    exact: true,
    render: () => {
      isLogin() ? <Redirect to="/root" /> : <Redirect to="/login" />;
    },
  },
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
  },
];

const mainRoutes = [
  {
    path: ['/root', '/root/*'],
    // exact: true,
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
  {
    path: '/welcome',
    exact: true,
    main: () => <WelcomePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
