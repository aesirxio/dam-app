import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import ComponentImage from 'components/ComponentImage';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { observer } from 'mobx-react';
import { DAM_SUBSCIPTION_FIELD_KEY } from 'aesirx-dma-lib';

import '../index.scss';
import Storage from 'SVG/Storage';

const calculatorPercentage = (a, b) => {
  return (a / b) * 100 ?? 0;
};
const AesirXDamStorage = observer(
  class AesirXDamStorage extends Component {
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
      const { t } = this.props;
      return (
        <>
          <div className="w-100 mb-3 px-3 py-3">
            <p className="mb-0">
              {/* <ComponentImage src="/assets/images/storage.svg" /> */}
              <Storage />
              <span className="text-white ps-3">{t('txt_storage')}</span>
            </p>
            <div className="progress my-3">
              <div
                className="progress-bar bg-cyan"
                role="progressbar"
                style={{
                  width: `${calculatorPercentage(
                    this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PRODUCT]?.[
                      DAM_SUBSCIPTION_FIELD_KEY.PRODUCT_STORAGE_USAGE
                    ],
                    this.damListViewModel?.subscription?.[0]?.[DAM_SUBSCIPTION_FIELD_KEY.PACKAGE]?.[
                      DAM_SUBSCIPTION_FIELD_KEY.PACKAGE_STORAGE_LIMIT
                    ]
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
        </>
      );
    }
  }
);

export default withTranslation('common')(withDamViewModel(AesirXDamStorage));
