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

const gigabyte = 1000000000;
const mbToByte = 1000000;

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return 0;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return {
    usageValue: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) ?? 0,
    usageType: sizes[i] ?? 'KB',
  };
}

const calculatorPercentage = (a, b) => {
  return (a / b) * 100 ?? 0;
};

const Storage = () => {
  const [subscription, setSubscription] = useState(null);
  const { t } = useTranslation();

  const getSubscription = async () => {
    try {
      const store = new DamStore();
      const subscriptionDetail = await store.getSubscription();
      const usage = subscriptionDetail[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE];
      const limit = subscriptionDetail[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT];
      if (usage != undefined && limit != undefined) {
        const percentage = calculatorPercentage(usage, limit);
        const isGb = limit >= gigabyte;
        const convertUsage = formatBytes(usage);
        const convertLimit = isGb ? limit / gigabyte : limit / mbToByte;
        setSubscription({
          [DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE]: convertUsage.usageValue,
          [DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT]: convertLimit,
          limit_type: isGb ? 'GB' : 'MB',
          usage_type: convertUsage.usageType,
          percentage: percentage,
        });
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
            width: `${subscription?.percentage ?? 0}%`,
          }}
          aria-label="Basic example"
          aria-valuenow={subscription?.percentage ?? 0}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <p className="mb-0 d-flex flex-wrap ">
        <span className="text-white fs-14">
          {subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE]
            ? subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE]
            : 0}
          {subscription?.usage_type ?? 'MB'} {t('txt_of')}{' '}
          {subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT]
            ? subscription?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT]
            : 0}
          {subscription?.limit_type ?? 'MB'} {t('txt_used')}
          {/* {subscription?.[
              DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
            ] ?? 'Unlimited'} */}
        </span>
        <a
          href="https://dapp.shield.aesirx.io/licenses"
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
