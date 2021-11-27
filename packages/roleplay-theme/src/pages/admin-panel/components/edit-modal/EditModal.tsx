import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {EditModalProps} from './EditModal.types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export function EditModal<T>({header, children, onSubmit}: EditModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await onSubmit();
    } finally {
      setSpinner(false);
    }
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{header}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <span onClick={toggleModal}>Cancel</span>
            <button
              className="btn btn-outline-success ml-2"
              disabled={spinner}
              onClick={onConfirm}
            >
              {spinner ? (
                <Icon className="fa-spin" type="spinner" />
              ) : (
                'Confirm'
              )}
            </button>
          </ModalFooter>
        </Modal>
      )}
      <button
        className="btn btn-outline-info mr-4"
        onClick={toggleModal}
        disabled={spinner}
      >
        <Icon type="pencil" />
        Edit
      </button>
    </>
  );
}
