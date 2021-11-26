import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {DeleteModalProps} from './DeleteModal.types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export function DeleteModal({header, children, onDelete}: DeleteModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await onDelete();
    } finally {
      setSpinner(false);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <span onClick={toggleModal}>Cancel</span>
          <button
            className="btn btn-outline-danger ml-2"
            disabled={spinner}
            onClick={onConfirm}
          >
            {spinner ? (
              <Icon className="fa-spin" type="spinner" />
            ) : (
              'Confirm Deletion'
            )}
          </button>
        </ModalFooter>
      </Modal>
      <button
        className="btn btn-outline-danger mr-4"
        onClick={toggleModal}
        disabled={spinner}
      >
        <Icon type="times" />
        Delete
      </button>
    </>
  );
}
