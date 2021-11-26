import {useLocation} from 'wouter';
import React, {useContext, useState} from 'react';
import {PartyActionsProps} from '../PartyActions.types';
import {Icon, sessionContext} from '@instinct-web/core';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {politicalPartyService} from '@instinct-plugin/roleplay-web';

export function DeletePartyButton({politicalParty}: PartyActionsProps) {
  const {user} = useContext(sessionContext);
  const [location, setLocation] = useLocation();
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await politicalPartyService.deleteByID(politicalParty.id);
      setLocation('/government/parties');
    } finally {
      setSpinner(false);
    }
  }

  if (user!.id !== politicalParty.founder.id) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader>
        <ModalBody>
          <h3>Are You Sure?</h3>
          <p>
            You are about to delete your political party,{' '}
            <b>{politicalParty.name}</b>
          </p>
        </ModalBody>
        <ModalFooter>
          <span onClick={toggleModal}>Cancel</span>
          <button
            className="btn btn-outline-danger ml-2"
            disabled={spinner}
            onClick={onConfirm}
          >
            {spinner ? <Icon className="fa-spin" type="spinner" /> : 'Confirm'}
          </button>
        </ModalFooter>
      </Modal>
      <button className="btn btn-outline-danger ml-2" onClick={toggleModal}>
        Delete Party
      </button>
    </>
  );
}
