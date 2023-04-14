/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import common_en from './en/common.json';
import common_dk from './dk/common.json';
import common_vn from './vi/common.json';
import common_th from './th/common.json';
import common_hr from './hr/common.json';
import common_ua from './ua/common.json';
import common_fr from './fr/common.json';
import common_es from './es/common.json';

const listLanguages = {
  en: {
    title: 'English',
    dam: common_en,
  },
  da: {
    title: 'Dansk',
    dam: common_dk,
  },
  vi: {
    title: 'Tiếng Việt',
    dam: common_vn,
  },
  th: {
    title: 'ภาษาไทย',
    dam: common_th,
  },
  hr: {
    title: 'Hrvatski',
    dam: common_hr,
  },
  uk: {
    title: 'Yкраїнська',
    dam: common_ua,
  },
  fr: {
    title: 'Français',
    dam: common_fr,
  },
  es: {
    title: 'Español',
    dam: common_es,
  },
};

if (i18n.isInitialized) {
  Object.entries(listLanguages).forEach(([key, val]) => {
    i18n.addResourceBundle(key, 'dam', val.dam);
  });
} else {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      // we init with resources
      resources: listLanguages,
      lng: localStorage.getItem('i18nextLng') || 'en',
      fallbackLng: 'en',
      debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

      // have a common namespace used around the full app
      ns: ['translations'],
      defaultNS: 'translations',

      keySeparator: false, // we use content as keys

      interpolation: {
        escapeValue: false,
      },
    });
}
export default i18n;
