import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {MakeOfferOnPropertyModalProps} from './MakeOfferOnPropertyModal.types';

export function MakeOfferOnPropertyModal({}: MakeOfferOnPropertyModalProps) {
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
            <Icon type="handshake" />
            Bidding on Property: <b>Warehouse #4</b>
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
                  Once you confirm, your bid will be sent to the owner of the
                  property for review.
                </p>
                <p>
                  Once submitted, all bids are final and cannot be cancelled.
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
              className="btn btn-outline-info ml-2"
              disabled={spinner}
              onClick={onConfirm}
            >
              {spinner ? (
                <Icon className="fa-spin" type="spinner" />
              ) : (
                <>Confirm $5,500 Bid</>
              )}
            </button>
          </ModalFooter>
        </Modal>
      )}
      <button
        className="btn btn-outline-info"
        onClick={toggleModal}
        disabled={spinner}
      >
        <Icon type="handshake" />
        Make Offer
      </button>
    </>
  );
}
