/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

class GlobalUtils {
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
    return response.map((el) => ({ id: el.id, name: el.name }));
  };
}

const utils = new GlobalUtils();

export default utils;
