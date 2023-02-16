/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

import ComponentImage from 'components/ComponentImage';

import { DAM_SUBSCIPTION_FIELD_KEY } from 'aesirx-dma-lib';
import DamStore from 'store/DamStore/DamStore';

const calculatorPercentage = (a, b) => {
  return (a / b) * 100 ?? 0;
};

const Storage = ({ lang = 'en', theme = 'light' }) => {
  const [subscription , setSubscription] = useState(null);
  const { i18n , t } = useTranslation('common');

  const getSubscription = async () => {
    try {
      const store = new DamStore();
      const subscriptionFromLibrary = await store.getSubscription();
      if (subscriptionFromLibrary) {
        setSubscription(subscriptionFromLibrary);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
    useEffect(() => {
      if(!subscription) {
        getSubscription()
      }
      i18n.changeLanguage(lang ?? 'en');
      return () => {};
    }, [lang, i18n.language, subscription]);
  
    return (
      <div className={`w-100 mb-3 px-3 py-3 ${theme ?? 'light'}`}>
        <p className="mb-0">
          <ComponentImage src="/assets/images/storage.svg" />
          <span className="text-white ps-3">{t('txt_storage')}</span>
        </p>
        <div className="progress my-3">
          <div
            className="progress-bar bg-cyan"
            role="progressbar"
            style={{
              width: `${calculatorPercentage(
                subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
                  DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
                ],
                subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                  DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
                ]
              )}%`,
            }}
            aria-label="Basic example"
            aria-valuenow={calculatorPercentage(
              subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
                DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
              ],
              subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
              ]
            )}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="mb-0 d-flex flex-wrap ">
          <span className="text-white fs-14">
            {subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
              DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
            ] ?? 0}
            {'MB '}
            {t('txt_of')}{' '}
            {subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
              DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
            ] ?? 0}
            {'MB '}
            {t('txt_used')}
            {/* {subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
              DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
            ] ?? 'Unlimited'} */}
          </span>
          <a
            href="https://dam.aesirx.io/#packages"
            className="text-cyan text-decoration-underline fs-14 d-inline-block ps-1"
          >
            {t('txt_upgrade')}
          </a>
        </p>
      </div>
    );
}

export default (Storage);
