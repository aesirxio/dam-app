/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_ASSETS_API_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';

class DamUtils {
  transformPersonaResponseIntoModel = (response) => {
    // return Object.keys(response)
    //   .map((index) => {
    //     return [...Array(response[index])].map((item) => {
    //       return new HomeModel(item);
    //     });
    //   })
    //   .reduce((arr, el) => {
    //     return arr.concat(el);
    //   }, []);
    return response;
  };

  transformResponseIntoSearchItems = (response) => {
    // return response.map((el) => ({
    //   id: el.id,
    //   name: el.name,
    //   type: response?.[DAM_ASSETS_API_FIELD_KEY.TYPE] ?? 'folder',
    // }));
    return response;
  };
}

const utils = new DamUtils();

export default utils;
