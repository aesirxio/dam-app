/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { isLogin } from 'auth';

import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginPage from '../containers/LoginPage';

import WelcomePage from '../containers/WelcomePage';
import DashboardPage from '../containers/Homepage';
import SettingPage from 'containers/SettingPage';

import ProfilePage from '../containers/ProfilePage';

const authRoutes = [
  {
    path: '/',
    exact: true,
    main: () => (isLogin() ? <Redirect to="/root" /> : <Redirect to="/login" />),
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
