import {useLocation} from 'wouter';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {businessService} from '@instinct-plugin/roleplay-web';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ConfirmBusinessCreationModalProps} from './ConfirmBusinessCreationModal.types';
import {businessRegistrationFee} from '../../Business.const';

export function ConfirmBusinessCreationModal({
  businessDTO,
  isOpen,
  onToggle,
}: ConfirmBusinessCreationModalProps) {
  const [location, setLocation] = useLocation();

  const [spinner, setSpinner] = useState(false);

  async function onConfirm() {
    try {
      setSpinner(true);
      const business = await businessService.create(businessDTO);
      setLocation(`/businesses/${business.id}`);
    } catch {
      toast.error('Failed to create business at this time.');
    } finally {
      setSpinner(false);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={onToggle}>
      <ModalHeader toggle={onToggle}>Confirmation</ModalHeader>
      <ModalBody>
        <h3>Are You Sure?</h3>
        <p>You are about to create a new business.</p>
        <p>
          Upon creating your business, the initial investment alongside
          registration fees will be automatically deducted from your balance.
        </p>
        <div className="mt-3">
          <h3>Total Cost</h3>
          <div
            style={{
              background: '#001726',
              padding: 10,
              fontWeight: 500,
              fontSize: 22,
            }}
          >
            ${Number(businessRegistrationFee).toLocaleString()}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <span onClick={onToggle}>Cancel</span>
        <button
          className="btn btn-outline-success ml-2"
          disabled={spinner}
          onClick={onConfirm}
        >
          {spinner ? (
            <>
              {' '}
              <Icon className="fa-spin" type="spinner" /> Saving{' '}
            </>
          ) : (
            'Confirm'
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
}
