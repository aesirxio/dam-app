import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
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
    <div
      className={`text-gray-900 ${
        data.length > 2 ? 'fs-3' : 'fs-2'
      } mb-0 fw-bold d-flex flex-wrap align-items-center`}
    >
      <span>
        <Link className="text-body" to="/root">
          {t('txt_your_digital_assets')}
        </Link>
      </span>
      {data.length <= 2 ? (
        data.map((_breadcrumb, index) => {
          if (index < 2) {
            return (
              _breadcrumb?.name && (
                <span key={_breadcrumb?.id}>
                  <FontAwesomeIcon size={'2xs'} className="text-green px-2" icon={faAngleRight} />
                  <Link className="text-body" to={handleLink(_breadcrumb?.id)}>
                    {_breadcrumb.name}
                  </Link>
                </span>
              )
            );
          }
          return <span key={index} className={styles.dot}></span>;
        })
      ) : data.length > 3 ? (
        <>
          <span>
            <FontAwesomeIcon size={'2xs'} className="text-green px-2" icon={faAngleRight} />
            <Link className="text-body" to={handleLink(data[0]?.id)}>
              {data[0].name}
            </Link>
            <FontAwesomeIcon size={'2xs'} className="text-green px-2" icon={faAngleRight} />
          </span>
          <div className={`text-body fs-5 d-flex align-items-center cursor-pointer ${styles.dot}`}>
            <Dot />
            <div
              className={` position-absolute start-0 shadow-sm top-100 bg-white rounded-3 border zindex-5 ${styles.list}`}
            >
              {data.map((_breadcrumb, index) => {
                if (index !== 0 || index !== data.length - 1) {
                  return (
                    _breadcrumb?.name && (
                      <Link
                        key={index}
                        className="text-body m-0 btn border-bottom px-2 d-flex align-items-center"
                        to={handleLink(_breadcrumb?.id)}
                      >
                        <>
                          <FontAwesomeIcon className="text-body px-2" icon={faFolder} />
                          {_breadcrumb.name}
                        </>
                      </Link>
                    )
                  );
                }
                return;
              })}
            </div>
          </div>
          <span>
            <FontAwesomeIcon size={'2xs'} className="text-green px-2" icon={faAngleRight} />
            <Link className="text-body" to={handleLink(data[data.length - 1]?.id)}>
              {data[data.length - 1].name}
            </Link>
          </span>
        </>
      ) : null}
    </div>
  );
};

export default BreadCrumbs;
