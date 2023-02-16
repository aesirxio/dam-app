import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import Dot from 'SVG/Dot';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';

const BreadCrumbs = ({ data = [], handleLink }) => {
  const { t } = useTranslation('common');
  if (!data) {
    return;
  }
  return (
    <div className={`text-gray-900 fs-2 mb-0 fw-bold d-flex flex-wrap align-items-center`}>
      <span className="text-body mb-0 cursor-pointer" onClick={() => handleLink('/root')}>
        {t('txt_your_digital_assets')}
      </span>
      {data.length <= 2 ? (
        data.map((_breadcrumb, index) => {
          if (index < 2) {
            return (
              _breadcrumb?.name && (
                <span key={_breadcrumb?.id}>
                  <FontAwesomeIcon size={'2xs'} className="text-green px-3" icon={faAngleRight} />
                  <span
                    className="text-body cursor-pointer"
                    onClick={() => handleLink(_breadcrumb?.id)}
                  >
                    {_breadcrumb.name}
                  </span>
                </span>
              )
            );
          }
          return <span key={index} className={styles.dot}></span>;
        })
      ) : data.length >= 3 ? (
        <>
          <span>
            <FontAwesomeIcon size={'2xs'} className="text-green px-3" icon={faAngleRight} />
            <span className="text-body" onClick={() => handleLink(data[0]?.id)}>
              {data[0].name}
            </span>
            <FontAwesomeIcon size={'2xs'} className="text-green px-3" icon={faAngleRight} />
          </span>
          <div className={`text-body fs-5 d-flex align-items-center cursor-pointer ${styles.dot}`}>
            <Dot />
            <div
              className={`w-max position-absolute start-0 shadow-sm top-100 bg-white rounded-3 border zindex-5 ${styles.list}`}
            >
              {data.map((_breadcrumb, index) => {
                if (index === 0 || index === data.length - 1) {
                  return;
                } else {
                  return (
                    _breadcrumb?.name && (
                      <span
                        key={index}
                        className="text-body py-1 m-0 btn border-bottom px-2 d-flex align-items-center cursor-pointer"
                        onClick={() => handleLink(_breadcrumb?.id)}
                      >
                        <>
                          <FontAwesomeIcon className="text-body px-3" icon={faFolder} />
                          {_breadcrumb.name}
                        </>
                      </span>
                    )
                  );
                }
              })}
            </div>
          </div>
          <span>
            <FontAwesomeIcon size={'2xs'} className="text-green px-3" icon={faAngleRight} />
            <span
              className="text-body cursor-pointer"
              onClick={() => handleLink(data[data.length - 1]?.id)}
            >
              {data[data.length - 1].name}
            </span>
          </span>
        </>
      ) : null}
    </div>
  );
};

export default BreadCrumbs;
