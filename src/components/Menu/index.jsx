/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { NavLink } from 'react-router-dom';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ComponentImage from 'components/ComponentImage';
import { observer } from 'mobx-react';
import Accordion from 'react-bootstrap/Accordion';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import history from 'routes/history';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import './index.scss';
import { useAccordionButton } from 'react-bootstrap';
const dataMenu = [
  // {
  //   text: 'txt_menu_member',
  //   link: '/',
  //   icons: '/assets/images/member.svg',
  //   icons_color: '/assets/images/member.svg',
  // },
  // {
  //   text: 'txt_menu_import_export',
  //   link: '/projects',
  //   icons: '/assets/images/import.svg',
  //   icons_color: '/assets/images/import.svg',
  // },
  // {
  //   text: 'txt_menu_colection_transfer',
  //   link: '/campaigns',
  //   icons: '/assets/images/collection_transfer.svg',
  //   icons_color: '/assets/images/collection_transfer.svg',
  // },
  {
    text: 'txt_menu_setting',
    link: '/setting',
    icons: '/assets/images/setting.svg',
    icons_color: '/assets/images/setting.svg',
  },
  // {
  //   text: 'txt_menu_trash',
  //   link: '/digital-assets',
  //   icons: '/assets/images/trash.svg',
  //   icons_color: '/assets/images/trash.svg',
  // },
];

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div className="item_menu" onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

const Menu = observer(
  class Menu extends React.Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.damListViewModel = this.viewModel ? this.viewModel.damListViewModel : null;
    }

    handleClick = (e) => {
      e.preventDefault();

      if (history.location.pathname === '/root') {
        return;
      } else {
        history.goBack();
      }
    };

    render() {
      const { t } = this.props;
      const { collections } = this.damListViewModel;
      const collectionId = history.location.pathname.split('/');
      return (
        <>
          <nav className="main-menu pt-3 pb-1">
            <p className="text-white-50 fs-14 px-3">{t('txt_main_menu')}</p>

            <Accordion defaultActiveKey={'0'}>
              {history.location.pathname === '/root' ? (
                <CustomToggle className="item_menu" as={'div'} eventKey={'0'}>
                  <NavLink
                    onClick={this.handleClick}
                    exact={true}
                    to={'/root'}
                    className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none `}
                    activeClassName={`active`}
                  >
                    <ComponentImage
                      alt={'folder'}
                      src="/assets/images/folder-outline.svg"
                      className=" d-inline-block align-text-bottom"
                      wrapperClassName="col-auto"
                    />
                    <span className="ms-3 text py-1 d-inline-block col">{t('txt_my_assets')}</span>
                  </NavLink>
                </CustomToggle>
              ) : (
                <div className="item_menu">
                  <NavLink
                    onClick={this.handleClick}
                    exact={true}
                    to={'/root'}
                    className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none `}
                    activeClassName={`active`}
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className=" d-inline-block align-text-bottom col-auto"
                    />
                    <span className="ms-3 text py-1 d-inline-block col">{t('txt_back')}</span>
                  </NavLink>
                </div>
              )}

              <Accordion.Collapse eventKey={'0'} className="px-3 pb-3">
                <>
                  <ul id="wr_list_menu" className="list-unstyled mb-0  pt-md-1">
                    {collections.map((value, key) => {
                      return !isNaN(+collectionId[collectionId.length - 1]) ? (
                        value.parent_id === +collectionId[collectionId.length - 1] ? (
                          <li
                            key={key}
                            className={`item_menu ${value.className ? value.className : ''}`}
                          >
                            <NavLink
                              exact={true}
                              to={'/root/' + value.id}
                              className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none `}
                              activeClassName={`active`}
                            >
                              <ComponentImage
                                alt={'folder'}
                                src="/assets/images/folder-outline.svg"
                                className=" d-inline-block align-text-bottom col-auto"
                              />
                              <span className="ms-3 text py-1 d-inline-block overflow-hidden col">
                                {value.name}
                              </span>
                            </NavLink>
                          </li>
                        ) : null
                      ) : value.parent_id === 0 ? (
                        <li
                          key={key}
                          className={`item_menu ${value.className ? value.className : ''}`}
                        >
                          <NavLink
                            exact={true}
                            to={'/root/' + value.id}
                            className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none `}
                            activeClassName={`active`}
                          >
                            <ComponentImage
                              alt={'folder'}
                              src="/assets/images/folder-outline.svg"
                              className=" d-inline-block align-text-bottom"
                              wrapperClassName="col-auto"
                            />
                            <span className="ms-3 text py-1 d-inline-block col overflow-hidden">
                              {value.name}
                            </span>
                          </NavLink>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </>
              </Accordion.Collapse>
            </Accordion>
          </nav>
          <nav className="border-top py-3">
            <p className="text-white-50 fs-14 px-3 mb-0">{t('txt_set_up')}</p>
            <ul id="wr_list_menu" className="list-unstyled mb-0 pt-md-1">
              {dataMenu.map((value, key) => {
                return (
                  <li key={key} className={`item_menu ${value.className ? value.className : ''}`}>
                    <NavLink
                      exact={true}
                      to={value.link}
                      className={`d-block rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none `}
                      activeClassName={`active`}
                    >
                      <span
                        className="icon d-inline-block align-text-bottom"
                        style={{
                          WebkitMaskImage: `url(${value.icons_color})`,
                          WebkitMaskRepeat: 'no-repeat',
                        }}
                      ></span>
                      <span className="ms-3 text py-1 d-inline-block">{t(value.text)}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withDamViewModel(Menu)));
