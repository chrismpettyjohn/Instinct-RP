import React, {useState} from 'react';
import {OpenVotingModalProps} from './OpenVotingModal.types';
import {lawService} from '@instinct-plugin/roleplay-web';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Icon} from '@instinct-web/core';
import {RPPermissionGuard} from '../../../../../components/templates/permission-guard';
import {LawStatus} from '@instinct-plugin/roleplay-types';

export function OpenVotingModal({law, onFinish}: OpenVotingModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await lawService.openVotingByID(law.id);
      onFinish();
    } finally {
      setSpinner(false);
    }
  }

  if (law.status !== LawStatus.Draft) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader>
        <ModalBody>
          <h3>Are You Sure?</h3>
          <p>You are about to open voting for this law</p>
          <p>
            Upon confirmation,{' '}
            <b>
              A-{law.id} {law.title}
            </b>{' '}
            will be able to be voted on by the National Assembly.
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
      <RPPermissionGuard permission="websiteOpenVotingOnLaws" redirect={false}>
        <button
          className="btn btn-outline-info"
          onClick={toggleModal}
          disabled={spinner}
        >
          <Icon type="gavel" />
          Open Voting
        </button>
      </RPPermissionGuard>
    </>
  );
}
