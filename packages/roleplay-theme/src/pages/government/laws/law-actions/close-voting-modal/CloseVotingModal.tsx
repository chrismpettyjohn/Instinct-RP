import React, {useState} from 'react';
import {OpenVotingModalProps} from './CloseVotingModal.types';
import {lawService} from '../../../../../services/law';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Icon} from '@instinct-web/core';
import {RPPermissionGuard} from '../../../../../components/templates/permission-guard';
import {LawStatus} from '@instinct-plugin/roleplay-types';

export function CloseVotingModal({law, onFinish}: OpenVotingModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await lawService.stopVotingByID(law.id);
      onFinish();
    } finally {
      setSpinner(false);
    }
  }

  if (law.status !== LawStatus.UnderReview) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader>
        <ModalBody>
          <h3>Are You Sure?</h3>
          <p>You are about to close voting for this law</p>
          <p>
            Upon confirmation, voting will be closed for{' '}
            <b>
              A-{law.id} {law.title}
            </b>{' '}
            and all votes will be counted to determine if this bill
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
      <RPPermissionGuard permission="websiteStopVotingOnLaws" redirect={false}>
        <button
          className="btn btn-outline-warning"
          onClick={toggleModal}
          disabled={spinner}
        >
          <Icon type="gavel" />
          Close Voting
        </button>
      </RPPermissionGuard>
    </>
  );
}
