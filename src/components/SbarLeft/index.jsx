/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'translations/i18n';

import './index.scss';
import Menu from '../Menu';
import SwitchThemes from 'components/SwitchThemes';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import ComponentImage from 'components/ComponentImage';
import Menu2 from 'components/Menu2';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { observer } from 'mobx-react';
import { DAM_SUBSCIPTION_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';

const calculatorPercentage = (a, b) => {
  return (a / b) * 100 ?? 0;
};

const SbarLeft = observer(
  class SbarLeft extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.damListViewModel = this.viewModel ? this.viewModel.damListViewModel : null;
    }

    componentDidMount() {
      this.damListViewModel.getSubscription();
    }
    render() {
      let { settingPage } = this.props;

      const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
        return { language: key, title: i18n.options.resources[key].title };
      });
      let currentLanguage = listLanguages.filter((lang) => {
        if (lang.language == i18n.language) {
          return lang.title;
        }
      });
      const { t } = this.props;
      return (
        <aside
          className={`sidebar w-248  mt-0 position-relative bg-dark mh-100 overflow-hidden overflow-y-auto d-flex flex-column z-index-100 `}
        >
          {!settingPage ? (
            <>
              <Menu />
            </>
          ) : (
            <Menu2 />
          )}

          <div className="position-absolute d-flex flex-wrap align-items-center bottom-0 mb-1 border-top w-100 py-1 button-language ">
            <Dropdown as={'div'} className="col py-2 px-3">
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-basic"
                className="bg-transparent border-0 p-0"
              >
                <FontAwesomeIcon icon={faGlobe} /> {currentLanguage[0]?.title}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {listLanguages.map((item, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      href="#"
                      className=""
                      onClick={() => {
                        i18n.changeLanguage(item.language);
                      }}
                    >
                      {item.title}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <div className="switch-theme-button col-auto py-2 px-3">
              <SwitchThemes />
            </div>
            <div className="w-100 mb-3 border-top px-3 py-3">
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
                      this.damListViewModel?.subscription?.[0]?.[
                        DAM_SUBSCIPTION_FIELD_KEY.PRODUCT
                      ]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE],
                      this.damListViewModel?.subscription?.[0]?.[
                        DAM_SUBSCIPTION_FIELD_KEY.PACKAGE
                      ]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT]
                    )}%`,
                  }}
                  aria-label="Basic example"
                  aria-valuenow={calculatorPercentage(
                    this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
                      DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
                    ],
                    this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                      DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
                    ]
                  )}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="mb-0 d-flex flex-wrap justify-space-between">
                <span className="text-white fs-14 col">
                  {
                    this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
                      DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
                    ]
                  }
                  {'MB '}
                  {t('txt_of')}{' '}
                  {
                    this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                      DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
                    ]
                  }
                  {'MB '}
                  {t('txt_used')}
                  {/* {this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                    DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
                  ] ?? 'Unlimited'} */}
                </span>
                <a
                  href="https://dam.aesirx.io/#packages"
                  className="text-cyan text-decoration-underline col-auto fs-14 d-inline-block ms-auto"
                >
                  {t('txt_upgrade')}
                </a>
              </p>
            </div>
            {/* <a href="/" className="d-flex align-items-center py-2 px-3">
              <ComponentImage src="/assets/images/help-icon.svg" />
              <span className="text-white ps-3">{t('txt_help_center')}</span>
            </a> */}
          </div>
        </aside>
      );
    }
  }
);

export default withTranslation('common')(withDamViewModel(SbarLeft));
