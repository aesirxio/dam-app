/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

import { Image } from 'aesirx-uikit';

import { DAM_SUBSCIPTION_FIELD_KEY } from 'aesirx-lib';
import DamStore from 'store/DamStore/DamStore';
import storage from './storage.svg';

const calculatorPercentage = (a, b) => {
  return (a / b) * 100 ?? 0;
};

const Storage = () => {
  const [subscription, setSubscription] = useState(null);
  const { t } = useTranslation();

  const getSubscription = async () => {
    try {
      const store = new DamStore();
      const subscriptionFromLibrary = await store.getSubscription();
      if (subscriptionFromLibrary) {
        const damSubscirption = subscriptionFromLibrary.find((item) => {
          if (item[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.type === 'product-aesirx-dam') {
            return item;
          }
        });
        setSubscription(damSubscirption);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    if (!subscription) {
      getSubscription();
    }

    return () => {};
  }, [subscription]);

  return (
    <div className={`damstorage w-100 mb-3 px-3 py-3`}>
      <p className="mb-0">
        <Image src={storage} />
        <span className="text-white ps-3">{t('txt_storage')}</span>
      </p>
      <div className="progress my-3" style={{ height: '5px' }}>
        <div
          className="progress-bar bg-cyan"
          role="progressbar"
          style={{
            width: `${calculatorPercentage(
              subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
                DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
              ],
              subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
              ]
            )}%`,
          }}
          aria-label="Basic example"
          aria-valuenow={calculatorPercentage(
            subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
              DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
            ],
            subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
              DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
            ]
          )}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <p className="mb-0 d-flex flex-wrap ">
        <span className="text-white fs-14">
          {subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
            DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
          ]
            ? subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
                DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
              ]
            : 0}
          {'MB '}
          {t('txt_of')}{' '}
          {subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
            DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
          ]
            ? subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
              ]
            : 0}
          {'MB '}
          {t('txt_used')}
          {/* {subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
              DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
            ] ?? 'Unlimited'} */}
        </span>
        <a
          href="https://dam.aesirx.io/#packages"
          className="text-cyan text-decoration-underline fs-14 d-inline-block ps-1"
          target="_blank"
          rel="noreferrer"
        >
          {t('txt_upgrade')}
        </a>
      </p>
    </div>
  );
};

export default Storage;
