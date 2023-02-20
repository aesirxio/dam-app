import React from 'react';
import AesirXDam from 'integration/lib';
import ModalComponent from 'components/Modal';
import './index.scss';
function ModalDAMComponent({ show, onHide, onSelect }) {
  return (
    <ModalComponent
      dialogClassName={'modal-xl modal_digital_assets'}
      show={show}
      onHide={onHide}
      centered
      autoFocus={false}
      body={
        <div className="modal-class">
          <AesirXDam onSelect={onSelect} />
        </div>
      }
    />
  );
}

export default ModalDAMComponent;
