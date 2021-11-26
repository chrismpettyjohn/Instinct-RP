import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {lawService} from '@instinct-plugin/roleplay-web';
import {VoteOnLawModalProps} from './VoteOnLawModal.types';
import {LawVoteStatus} from '@instinct-plugin/roleplay-types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {RPPermissionGuard} from '../../../../../components/templates/permission-guard';

export function VoteOnLawModal({
  children,
  law,
  vote,
  onFinish,
}: VoteOnLawModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await lawService.voteByID(law.id!, {status: vote});
      onFinish();
    } finally {
      setSpinner(false);
    }
  }

  return (
    <RPPermissionGuard permission="websiteVoteOnLaws">
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader>
        <ModalBody>
          <h3>Are You Sure?</h3>
          <p>
            You are about to vote{' '}
            {vote === LawVoteStatus.Approved ? 'aye' : 'nay'} on A-{law.id}{' '}
            {law.title}
          </p>
          <p>
            Upon confirmation, your vote will be permanently saved and publicly
            available.
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
      <div onClick={toggleModal}>{children}</div>
    </RPPermissionGuard>
  );
}
