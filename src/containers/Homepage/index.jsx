/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';
import Spinner from '../../components/Spinner';

import HomeActionBar from './HomeForm/HomeActionBar';
import HomeList from './HomeList/HomeList';

const HomePage = (props) => {
  return (
    <div className="py-4 px-32px h-100 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <HomeActionBar {...props} />
      </div>
      <Suspense fallback={<Spinner />}>
        <HomeList />
      </Suspense>
    </div>
  );
};

export default HomePage;
