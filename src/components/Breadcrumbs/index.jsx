import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import Dot from 'svg/Dot';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';

const BreadCrumbs = ({ data = [], handleLink }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  if (!data) {
    return;
  }
  const handleClickOutside = useCallback(
    (e) => {
      const checkBreadCrumbClick = e.target.closest('.breadcrumb_item');
      if (!checkBreadCrumbClick && show) {
        setShow(false);
      }
    },
    [show]
  );

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

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
                    onClick={() => {
                      handleLink(_breadcrumb?.id);
                    }}
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
            <span className="text-body cursor-pointer" onClick={() => handleLink(data[0]?.id)}>
              {data[0].name}
            </span>
            <FontAwesomeIcon size={'2xs'} className="text-green px-3" icon={faAngleRight} />
          </span>
          <div className={`position-relative  cursor-pointer `}>
            <span
              className={`fs-5 d-flex breadcrumb_item align-items-center rounded-circle ${
                styles.dot
              } ${show && styles.active} ${
                show ? 'bg-success text-white' : 'bg-transparent text-body'
              }`}
              onClick={() => {
                setShow((prevState) => !prevState);
              }}
            >
              <Dot className={`pe-none`} />
            </span>

            {show ? (
              <div
                className={`pt-3 w-max position-absolute start-0 top-100 zindex-5 ${styles.list}`}
              >
                <div className={`w-max mt-2 start-0 shadow-sm bg-white rounded-3 border zindex-5`}>
                  {data.map((_breadcrumb, index) => {
                    if (index === 0 || index === data.length - 1) {
                      return;
                    } else {
                      return (
                        _breadcrumb?.name && (
                          <span
                            key={index}
                            className={`text-body py-1 m-0 btn border-bottom px-2 d-flex align-items-center cursor-pointer breadcrumb_item ${styles.h_40}`}
                            onClick={() => {
                              handleLink(_breadcrumb?.id);
                              setShow(false);
                            }}
                          >
                            <>
                              <FontAwesomeIcon className="text-body px-3 pe-none" icon={faFolder} />
                              <span className="text-body">{_breadcrumb.name}</span>
                            </>
                          </span>
                        )
                      );
                    }
                  })}
                </div>
              </div>
            ) : null}
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
