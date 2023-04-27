/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { UPDATE_PASSWORD_FIELD_KEY } from '../../../constants/ProfileModule';
import { MEMBER_FIELD_KEY } from 'aesirx-lib';

class ProfileModel {
  static convertSubmittedPasswordDataToAPIService(updatePasswordData) {
    return updatePasswordData
      ? {
          [UPDATE_PASSWORD_FIELD_KEY.ID]: updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.ID],
          [UPDATE_PASSWORD_FIELD_KEY.CURR_PASSWORD]:
            updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.CURR_PASSWORD],
          [UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD]:
            updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD],
          [UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD]:
            updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD],
        }
      : null;
  }

  static convertSubmittedGeneralDataToAPIService(updateGeneralData) {
    return updateGeneralData
      ? {
          [MEMBER_FIELD_KEY.ID]: updateGeneralData[MEMBER_FIELD_KEY.ID],
          [MEMBER_FIELD_KEY.FULL_NAME]: updateGeneralData[MEMBER_FIELD_KEY.FULL_NAME],
          [MEMBER_FIELD_KEY.AVATAR_DAM]: updateGeneralData[MEMBER_FIELD_KEY.AVATAR_DAM],
          [MEMBER_FIELD_KEY.BIRTHDAY]: updateGeneralData[MEMBER_FIELD_KEY.BIRTHDAY],
          [MEMBER_FIELD_KEY.PHONE]: updateGeneralData[MEMBER_FIELD_KEY.PHONE],
          [MEMBER_FIELD_KEY.ADDRESS]: updateGeneralData[MEMBER_FIELD_KEY.ADDRESS],
          [MEMBER_FIELD_KEY.ADDRESS_2]: updateGeneralData[MEMBER_FIELD_KEY.ADDRESS_2],
          [MEMBER_FIELD_KEY.ZIP_CODE]: updateGeneralData[MEMBER_FIELD_KEY.ZIP_CODE],
          [MEMBER_FIELD_KEY.CITY]: updateGeneralData[MEMBER_FIELD_KEY.CITY],
          [MEMBER_FIELD_KEY.STATE]: updateGeneralData[MEMBER_FIELD_KEY.STATE],
          [MEMBER_FIELD_KEY.COUNTRY]: updateGeneralData[MEMBER_FIELD_KEY.COUNTRY],
          [MEMBER_FIELD_KEY.TIMEZONE]: updateGeneralData[MEMBER_FIELD_KEY.TIMEZONE],
        }
      : null;
  }
}

export default ProfileModel;
