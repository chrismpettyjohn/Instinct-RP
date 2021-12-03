import {useLocation} from 'wouter';
import {toast} from 'react-toastify';
import React, {useContext, useState} from 'react';
import {Icon, sessionContext} from '@instinct-web/core';
import {propertyService} from '@instinct-plugin/roleplay-web';
import {BuyPropertyModalProps} from './BuyPropertyModal.types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export function BuyPropertyModal({property, onChange}: BuyPropertyModalProps) {
  const [location, setLocation] = useLocation();
  const {user, setUser} = useContext(sessionContext);
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await propertyService.buyNowByID(property.id.toString());
      setUser({credits: Number(user!.credits - property.buyNowPrice)});
      toast.success(
        `Congratulations!  You are now the proud owner of ${property.room.roomName}`
      );
      setLocation(`/properties/${property.id}/congratulations`);
      onChange();
    } catch {
      toast.error(
        `There was a problem when trying to purchase ${property.room.roomName}`
      );
    } finally {
      setSpinner(false);
    }
  }

  if (user!.credits < property.buyNowPrice) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} size="lg" toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <Icon type="dollar-sign" />
            Buying Property: <b>{property.room.roomName}</b>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-5">
                <div
                  style={{
                    display: 'block',
                    backgroundImage: `url(${
                      property.photos[0]?.photoURL ??
                      'https://i.imgur.com/RJnrGFD.png'
                    })`,
                    backgroundSize: 'cover',
                    border: '2px solid white',
                    borderRadius: 4,
                    cursor: 'pointer',
                    height: 300,
                    width: 300,
                  }}
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
                    {property.buyNowPrice}
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
                <>Buy for ${property.buyNowPrice}</>
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
