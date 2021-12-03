import {toast} from 'react-toastify';
import React, {useContext, useState} from 'react';
import {Icon, sessionContext} from '@instinct-web/core';
import {propertyService} from '@instinct-plugin/roleplay-web';
import {MakeOfferOnPropertyModalProps} from './MakeOfferOnPropertyModal.types';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
} from 'reactstrap';

export function MakeOfferOnPropertyModal({
  property,
  onChange,
}: MakeOfferOnPropertyModalProps) {
  const {user, setUser} = useContext(sessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [propertyOffer, setPropertyOffer] = useState(
    (property.bids?.[0]?.offer ?? 0) + 1
  );

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await propertyService.bidOnByID(property.id.toString(), {
        offer: propertyOffer,
      });
      toast.success(
        `You successfully bid ${propertyOffer.toLocaleString()} on ${
          property.room.roomName
        } for $${propertyOffer.toLocaleString()}`
      );
      setUser({credits: Number(user!.credits - propertyOffer)});
      onChange();
      setIsOpen(false);
    } catch {
      toast.error(
        `There was a problem when trying to bid on ${property.room.roomName}`
      );
    } finally {
      setSpinner(false);
    }
  }

  const [minBid, maxBid] = [
    (property.bids?.[0]?.offer ?? 0) + 1,
    user!.credits,
  ];

  if (user!.credits < minBid) {
    return null;
  }

  if (user!.id === property.user.id) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} size="lg" toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <Icon type="handshake" />
            Bidding on Property: <b>{property.room.roomName}</b>
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
                <b>New Bid</b>
                <p>
                  Once you confirm, your bid will be sent to the owner of the
                  property for review.
                </p>
                <p>
                  Once submitted, all bids are final and cannot be cancelled.
                </p>
                <h4>Bid Amount:</h4>
                <FormGroup>
                  <div className="row" style={{fontSize: 20}}>
                    <div className="col-4">${minBid.toLocaleString()}</div>
                    <div
                      className="col-4 text-center "
                      style={{fontWeight: 500}}
                    >
                      <Icon className="text-success" type="dollar-sign" />
                      {propertyOffer.toLocaleString()}
                    </div>
                    <div className="col-4 text-right">
                      ${maxBid.toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    className="form-control-range"
                    value={propertyOffer}
                    onChange={e => setPropertyOffer(Number(e.target.value))}
                    min={minBid}
                    max={maxBid}
                  />
                </FormGroup>
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
                <>Confirm ${propertyOffer.toLocaleString()} Bid</>
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
