/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'translations/i18n';

import SwitchThemes from 'components/SwitchThemes';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import ComponentImage from 'components/ComponentImage';
import { withDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { observer } from 'mobx-react';
import { DAM_SUBSCIPTION_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';

import { NavLink } from 'react-router-dom';

import Accordion from 'react-bootstrap/Accordion';
import { withRouter } from 'react-router-dom';
import history from 'routes/history';
import './index.scss';
import { useAccordionButton } from 'react-bootstrap';
import Folder from '../../public/assets/images/folder-outline.svg';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';

function CustomToggle({ children, eventKey, isRoot }) {
  const [open, setOpen] = useState(false);
  const custom = () => {
    setOpen((prevState) => !prevState);
  };
  const decoratedOnClick = useAccordionButton(eventKey, custom);
  return (
    <div className="item_menu position-relative">
      {children}

      <FontAwesomeIcon
        className={`text-color position-absolute top-50 translate-middle carvet-toggle text-green ${
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

const recurseMenu = (parent_id = 0, collections = [], link) => {
  if (parent_id === 0) {
    return (
      <Accordion.Collapse eventKey={'root'} className="px-3 pb-3">
        <ul id="wr_list_menu" className="list-unstyled mb-0  pt-md-1">
          {collections.map((value, key) => {
            return (
              value.parent_id === 0 && (
                <li key={key} className={`item_menu ${value.className ? value.className : ''}`}>
                  {recurseMenu(value, collections, 'root')}
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
  const filterCollectionsWithParentId = collections.filter(
    (collection) => parent_id?.id === collection.parent_id
  );
  return filterCollectionsWithParentId.length ? (
    <Accordion>
      <CustomToggle className="item_menu" as={'div'} eventKey={parent_id?.id}>
        <NavLink
          exact={true}
          to={'/' + link + '/' + parent_id.id}
          className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu text-white text-color text-decoration-none `}
          activeClassName={`active`}
        >
          <Folder />
          <span className="ms-3 text py-1 d-inline-block col">{parent_id.name}</span>
        </NavLink>
      </CustomToggle>

      <Accordion.Collapse eventKey={parent_id?.id} className="px-2 pb-3">
        <ul id="wr_list_menu" className="list-unstyled mb-0  pt-md-1">
          {filterCollectionsWithParentId.map((value, key) => {
            return (
              <li key={key} className={`item_menu ${value.className ? value.className : ''}`}>
                {recurseMenu(value, collections, link + '/' + parent_id.id)}
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
      className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none no-child`}
      activeClassName={`active`}
    >
      <Folder />
      <span className="ms-3 text py-1 d-inline-block col overflow-hidden">{parent_id.name}</span>
    </NavLink>
  );
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

    handleClick = (e) => {
      e.preventDefault();

      if (history.location.pathname === '/root') {
        return;
      } else {
        // history.goBack();
      }
    };

    render() {
      const { t } = this.props;
      const { collections } = this.damListViewModel;
      return (
        <aside
          className={`sidebar w-248  mt-0 position-relative bg-dark mh-100 overflow-hidden overflow-y-auto d-flex flex-column z-index-100 `}
        >
          <nav className="main-menu pt-3 pb-1">
            <p className="text-white-50 fs-14 px-3">{t('txt_main_menu')}</p>

            <Accordion alwaysOpen defaultActiveKey={'root'}>
              <CustomToggle className="item_menu" as={'div'} isRoot={true} alway eventKey={'root'}>
                <NavLink
                  exact={true}
                  to={'/root'}
                  className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1 link_menu_root text-white text-color text-decoration-none active`}
                >
                  <Folder />
                  <span className="ms-3 text py-1 d-inline-block col">{t('txt_my_assets')}</span>
                </NavLink>
              </CustomToggle>
              {recurseMenu(0, collections)}
            </Accordion>
          </nav>
        </aside>
      );
    }
  }
);

export default withTranslation('common')(withDamViewModel(SbarLeft));
