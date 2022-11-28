/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { NavLink } from 'react-router-dom';

import ComponentImage from 'components/ComponentImage';
import { observer } from 'mobx-react';
import Accordion from 'react-bootstrap/Accordion';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import history from 'routes/history';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import './index.scss';
import { useAccordionButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { useState } from 'react';

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

function CustomToggle({ children, eventKey, isRoot }) {
  const [open, setOpen] = useState(false);
  const custom = () => {
    setOpen((prevState) => !prevState);
  };
  const decoratedOnClick = useAccordionButton(eventKey, custom);
  return (
    <div className="item_menu position-relative ">
      {children}

      <FontAwesomeIcon
        className={` position-absolute top-50 translate-middle carvet-toggle text-green ${
          eventKey === 'root' ? 'index' : ''
        } ${open ? 'down' : ''}`}
        onClick={
          isRoot
            ? (e) => {
                e.preventDefault();
              }
            : decoratedOnClick
        }
        icon={faCaretRight}
      />
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

    recurseMenu = (parent_id = 0, link) => {
      if (parent_id === 0) {
        return (
          <Accordion.Collapse eventKey={'root'} className="pb-3">
            <ul id="wr_list_menu" className="list-unstyled mb-0">
              {this.damListViewModel.collections.map((value, key) => {
                return (
                  value.parent_id === 0 && (
                    <li
                      key={key}
                      className={`item_menu px-3 ${value.className ? ' ' + value.className : ''}${
                        history.location.pathname.split('/').includes(value.id.toString())
                          ? ' bg-sidebar'
                          : ''
                      }
                      `}
                    >
                      {this.recurseMenu(value, 'root')}
                    </li>
                  )
                );
              })}
            </ul>
          </Accordion.Collapse>
        );
      }
      if (!parent_id) {
        return null;
      }
      const filterCollectionsWithParentId = this.damListViewModel.collections.filter(
        (collection) => parent_id?.id === collection.parent_id
      );

      const isActive = history.location.pathname.split('/').includes(parent_id.id.toString());

      return filterCollectionsWithParentId.length ? (
        <Accordion>
          <CustomToggle className="item_menu" as={'div'} eventKey={parent_id?.id}>
            <NavLink
              exact={true}
              to={'/' + link + '/' + parent_id.id}
              className={`d-flex align-items-center rounded-1 px-3 py-2 link_menu text-white text-decoration-none ${
                isActive && 'active'
              }`}
              activeClassName={`active`}
            >
              <ComponentImage
                alt={'folder'}
                src="/assets/images/folder-outline.svg"
                className=" d-inline-block align-text-bottom"
                wrapperClassName="col-auto"
              />
              <span className="ms-3 py-1 d-inline-block col">{parent_id.name}</span>
            </NavLink>
          </CustomToggle>

          <Accordion.Collapse eventKey={parent_id?.id}>
            <ul id="wr_list_menu" className="list-unstyled mb-0 px-2">
              {filterCollectionsWithParentId.map((value, key) => {
                return (
                  <li key={key} className={`item_menu ${value.className ? value.className : ''}`}>
                    {this.recurseMenu(value, link + '/' + parent_id.id)}
                  </li>
                );
              })}
            </ul>
          </Accordion.Collapse>
        </Accordion>
      ) : (
        <NavLink
          exact={true}
          to={'/' + link + '/' + parent_id.id}
          className={`d-flex align-items-center rounded-1 px-3 py-2 link_menu text-white text-decoration-none no-child ${
            isActive && 'active'
          }`}
          activeClassName={`active`}
        >
          <ComponentImage
            alt={'folder'}
            src="/assets/images/folder-outline.svg"
            className=" d-inline-block align-text-bottom"
            wrapperClassName="col-auto"
          />
          <span className="ms-3 py-1 d-inline-block col overflow-hidden">{parent_id.name}</span>
        </NavLink>
      );
    };

    render() {
      const { t } = this.props;
      return (
        <>
          <nav className="main-menu pt-3 pb-1">
            <p className="text-white-50 fs-14 px-3">{t('txt_main_menu')}</p>
            <Accordion alwaysOpen defaultActiveKey={'root'}>
              <CustomToggle className="item_menu" as={'div'} isRoot={true} alway eventKey={'root'}>
                <NavLink
                  exact={true}
                  to={'/root'}
                  className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 bg-primary text-white text-decoration-none active`}
                >
                  <ComponentImage
                    alt={'folder'}
                    src="/assets/images/folder-outline.svg"
                    className=" d-inline-block align-text-bottom"
                    wrapperClassName="col-auto"
                  />
                  <span className="ms-3 py-1 d-inline-block col">{t('txt_my_assets')}</span>
                </NavLink>
              </CustomToggle>
              {this.recurseMenu(0)}
            </Accordion>
          </nav>
          <nav className="border-top py-3">
            <p className="text-white-50 fs-14 px-3 mb-0">{t('txt_set_up')}</p>
            <ul id="wr_list_menu" className="list-unstyled mb-0">
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
                      <span className="ms-3 py-1 d-inline-block">{t(value.text)}</span>
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
