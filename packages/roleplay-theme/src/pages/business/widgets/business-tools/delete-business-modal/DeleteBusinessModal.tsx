import {useLocation} from 'wouter';
import {toast} from 'react-toastify';
import React, {useContext, useState} from 'react';
import {Icon, sessionContext} from '@instinct-web/core';
import {BusinessToolsProps} from '../BusinessTools.types';
import {businessService} from '../../../../../services/business';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export function DeleteBusinessModal({business}: BusinessToolsProps) {
  const {user} = useContext(sessionContext);
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm(): Promise<void> {
    try {
      setSpinner(true);
      await businessService.delete(`${business.id}`);
      toast.success(`Your business ${business.name} has been deleted`);
      setLocation('/businesses');
    } catch {
      toast.error(`There was a problem deleting ${business.name}`);
    } finally {
      setSpinner(false);
    }
  }

  if (business.owner.id !== user!.id) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader>
        <ModalBody>
          <h3>Are You Sure?</h3>
          <p>
            You are about to delete <b>{business.name}</b>
          </p>
          <p>
            Upon confirmation, your business will be permanently deleted and all
            of your employees will become unemployed.
          </p>
          <p>
            Please consider reaching out to the Department of Labor, Commerce &
            Agriculture for a business loan if finances are a concern.
          </p>
        </ModalBody>
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
        className="btn btn-block btn-outline-danger"
        disabled={spinner}
        onClick={toggleModal}
      >
        <Icon type="trash" />
        Delete
      </button>
    </>
  );
}
