import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {SubmitLawModalProps} from './SubmitLawModal.types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export function SubmitLawModal({
  onSubmit,
  skipCheck = false,
}: SubmitLawModalProps) {
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
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader>
        <ModalBody>
          <h3>Are You Sure?</h3>
          <p>You are about to propose a new law.</p>
          <p>
            Upon confirmation, your new law will be drafted and ready for
            submission to the National Assembly.
          </p>
        </ModalBody>
        <ModalFooter>
          <span onClick={toggleModal}>Cancel</span>
          <button
            className="btn btn-outline-success ml-2"
            disabled={spinner}
            onClick={onConfirm}
          >
            {spinner ? <Icon className="fa-spin" type="spinner" /> : 'Confirm'}
          </button>
        </ModalFooter>
      </Modal>
      <button
        className="btn btn-outline-success ml-2"
        onClick={skipCheck ? onConfirm : toggleModal}
        disabled={spinner}
      >
        {spinner ? (
          <>
            <Icon className="fa-spin" type="spinner" /> Saving Changes...
          </>
        ) : (
          'Save Changes'
        )}
      </button>
    </>
  );
}
