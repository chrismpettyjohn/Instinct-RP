import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {BuyPropertyModalProps} from './BuyPropertyModal.types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export function BuyPropertyModal({}: BuyPropertyModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} size="lg" toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <Icon type="dollar-sign" />
            Buying Property: <b>Warehouse #4</b>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-5">
                <img
                  src="https://game.bobba.ca/clips/10.png"
                  width={300}
                  height={300}
                  style={{border: '2px solid white', borderRadius: 4}}
                />
              </div>
              <div className="col-7">
                <b>Are you sure?</b>
                <p>
                  Once you confirm, the cost of the property and additional
                  taxes will automatically be deducted from your bank account.
                </p>
                <h4>
                  Total Cost:
                  <b className="ml-2">
                    <Icon className="text-success" type="dollar-sign" />
                    5,550
                  </b>
                </h4>
              </div>
            </div>
          </ModalBody>
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
                <>Buy for $550</>
              )}
            </button>
          </ModalFooter>
        </Modal>
      )}
      <button
        className="btn btn-outline-success mr-4"
        onClick={toggleModal}
        disabled={spinner}
      >
        <Icon type="dollar-sign" />
        Buy Now
      </button>
    </>
  );
}
