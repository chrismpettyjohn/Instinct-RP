import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {lawService} from '../../../../../services/law';
import {DismissLawModalProps} from './DismissLawModal.types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {RPPermissionGuard} from '../../../../../components/templates/permission-guard';

export function DismissLawModal({law}: DismissLawModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await lawService.deleteByID(law.id);
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
          <p>You are about to dismiss this law and delete it from existence</p>
          <p>
            Upon confirmation,{' '}
            <b>
              A-{law.id} {law.title}
            </b>{' '}
            will be permanently deleted.
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
      <RPPermissionGuard permission="websiteDismissLaws" redirect={false}>
        <button
          className="btn btn-outline-danger mr-4"
          onClick={toggleModal}
          disabled={spinner}
        >
          <Icon type="times" />
          Delete
        </button>
      </RPPermissionGuard>
    </>
  );
}
