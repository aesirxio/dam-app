/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { withTranslation } from 'react-i18next';

import './index.scss';
import styles from './index.module.scss';
import { Modal } from 'react-bootstrap';

class ModalComponent extends React.Component {
  render() {
    let {
      header,
      footer,
      body,
      show,
      onHide,
      dialogClassName,
      onShow,
      bodyClassName,
      contentClassName,
      modalClassname,
      closeButton,
    } = this.props;
    return (
      <Modal
        show={show}
        onShow={onShow}
        onHide={onHide}
        centered
        dialogClassName={dialogClassName ?? ''}
        contentClassName={contentClassName ?? ''}
        className={modalClassname ?? '' + styles.modal}
      >
        <Modal.Header className="px-4 border-bottom-0 text-blue-0">
          {header && <Modal.Title>{header}</Modal.Title>}
          {closeButton && <span onClick={onHide} className="close"></span>}
        </Modal.Header>
        <Modal.Body className={`${bodyClassName ?? 'px-4 pt-2 pb-0'} `}>{body}</Modal.Body>
        {footer && <Modal.Footer className="px-4">{footer}</Modal.Footer>}
      </Modal>
    );
  }
}

export default withTranslation('dam')(ModalComponent);
