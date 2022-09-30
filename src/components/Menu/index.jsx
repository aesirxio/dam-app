/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { NavLink } from 'react-router-dom';

import './index.scss';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withHomeViewModel } from 'containers/Homepage/HomeViewModels/HomeViewModelContextProvider';
import history from 'routes/history';
import { withRouter } from 'react-router-dom';
import ComponentImage from 'components/ComponentImage';
import { Accordion } from 'react-bootstrap';
import PAGE_STATUS from 'constants/PageStatus';
import Spinner from 'components/Spinner';
import { withGlobalViewModel } from 'store/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

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
    link: '/content',
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
const Menu = observer(
  class Menu extends React.Component {
    globalViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.globalViewModel = this.viewModel ? this.viewModel.getGlobalViewModel() : null;
    }

    componentDidMount = () => {
      const collectionId = history.location.pathname.split('/');
      this.globalViewModel.getCollections(collectionId[2] ?? 0);
    };

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        const collectionId = history.location.pathname.split('/');
        this.globalViewModel.getCollections(collectionId[2] ?? 0);
      }
    }

    handleClick = (e) => {
      e.preventDefault();

      if (history.location.pathname === '/root') {
      } else {
        history.goBack();
      }
    };

    render() {
      const { t } = this.props;
      const { status, collections, pagination } = this.globalViewModel;
      const collectionId = history.location.pathname.split('/');
      return (
        <>
          <nav>
            <p className="text-white-50 fs-14 px-3">MAIN MENU</p>

            <Accordion defaultActiveKey={'0'}>
              {history.location.pathname === '/root' ? (
                <Accordion.Toggle className="item_menu" as={'div'} eventKey={'0'}>
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
                    />
                    <span className="ms-3 text py-1 d-inline-block">{t('txt_my_assets')}</span>
                  </NavLink>
                </Accordion.Toggle>
              ) : (
                <div className="item_menu">
                  <NavLink
                    onClick={this.handleClick}
                    exact={true}
                    to={'/root'}
                    className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none `}
                    activeClassName={`active`}
                  >
                    {/* <ComponentImage
                      alt={'folder'}
                      src="/assets/images/folder-outline.svg"
                      className=" d-inline-block align-text-bottom"
                    /> */}
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className=" d-inline-block align-text-bottom"
                    />
                    <span className="ms-3 text py-1 d-inline-block">{t('txt_back')}</span>
                  </NavLink>
                </div>
              )}

              <Accordion.Collapse eventKey={'0'} className="px-3 pb-3">
                <>
                  <div className="position-relative">
                    {status === PAGE_STATUS.LOADING ? <Spinner color="text-white" /> : null}
                  </div>
                  <ul id="wr_list_menu" className="list-unstyled mb-0  pt-md-1">
                    {collections.map((value, key) => {
                      return !isNaN(+collectionId[collectionId.length - 1]) ? (
                        value.parent_id === +collectionId[collectionId.length - 1] ? (
                          <li
                            key={key}
                            className={`item_menu ${value.className ? value.className : ''}`}
                            // onClick={(e) => this.handleCheckActive(value.link)}
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
                              />
                              <span className="ms-3 text py-1 d-inline-block">{value.name}</span>
                            </NavLink>
                          </li>
                        ) : null
                      ) : value.parent_id === 0 ? (
                        <li
                          key={key}
                          className={`item_menu ${value.className ? value.className : ''}`}
                          // onClick={(e) => this.handleCheckActive(value.link)}
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
                            />
                            <span className="ms-3 text py-1 d-inline-block">{value.name}</span>
                          </NavLink>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </>
              </Accordion.Collapse>
            </Accordion>
          </nav>
          <nav>
            <p className="text-white-50 fs-14 px-3">Set up</p>
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

export default withTranslation('common')(withRouter(withGlobalViewModel(Menu)));
