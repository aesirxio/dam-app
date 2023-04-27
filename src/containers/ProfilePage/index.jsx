/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import ProfileStore from './ProfileStore/ProfileStore';
import ProfileViewModel from './ProfileViewModel/ProfileViewModel';
import { ProfilePage as AesirXProfilePage, Spinner } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';
import { Storage } from 'aesirx-lib';

const profileStore = new ProfileStore();
const profileViewModel = new ProfileViewModel(profileStore);
const updateGeneralViewModel = profileViewModel.getUpdateGeneralViewModel();

const ProfilePage = observer(() => {
  useEffect(() => {
    updateGeneralViewModel?.initializeData(Storage.getItem('member_id'));
  }, []);

  if (updateGeneralViewModel.formStatus === PAGE_STATUS.LOADING) {
    return <Spinner />;
  }

  return (
    <AesirXProfilePage
      memberInfo={updateGeneralViewModel?.memberInfo}
      saveProfile={updateGeneralViewModel?.saveGeneralInformationOnPage}
    />
  );
});

export default ProfilePage;
