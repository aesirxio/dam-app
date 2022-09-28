/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import history from '../../../routes/history';

import ButtonNormal from '../../../components/ButtonNormal';
import { withTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { withHomeViewModel } from '../HomeViewModels/HomeViewModelContextProvider';
import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

class HomeActionBar extends Component {
  homeFormModalViewModel = null;
  homeListViewModel = null;
  openModal = false;
  constructor(props) {
    super(props);
    const { viewModel } = props;

    this.homeListViewModel = viewModel ? viewModel.getHomeListViewModel() : null;

    // if (props.location.state) {
    //   this.openModal = props.location.state.openModal;

    //   history.replace(props.location.pathname, { openModal: false });
    // }
  }

  componentDidMount() {
    if (this.openModal) {
      // this.homeFormModalViewModel.openModal();
    }
  }

  createProjectHandler = () => {
    // this.homeFormModalViewModel.openModal();
  };

  handerDeleteProject = () => {
    // this.homeListViewModel.deleteProjects();
  };

  render() {
    const { t } = this.props;
    return (
      <div className="d-flex justify-content-end">
        <ButtonNormal
          onClick={this.createProjectHandler}
          iconStart={faPlus}
          text="txt_upload_file"
          className="me-3 btn-success"
        />
        <ButtonNormal
          onClick={this.createProjectHandler}
          iconStart={faFolder}
          text="txt_create_folder"
          className="btn-outline-gray-300 text-blue-0"
        />
      </div>
    );
  }
}
export default withTranslation('common')(withHomeViewModel(HomeActionBar));
