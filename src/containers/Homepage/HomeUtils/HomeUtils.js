/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

// import HomeModel from '../HomeModel/HomeModel';

class HomeUtils {
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
}

const utils = new HomeUtils();

export default utils;
