import './JobOffer.scss';
import React, {useState} from 'react';
import Draggable from 'react-draggable';
import {useWebSocketEventListener} from '../../hooks/web-socket';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {WebSocketIncomingJobOfferEvent} from '@instinct-plugin/roleplay-types';

export function JobOfferWidget() {
  useWebSocketEventListener('user_offered_something', handleOffer);

  const [isOpen, toggleModal] = useState(false);

  function handleOffer(data: WebSocketIncomingJobOfferEvent) {
    console.log('Job Offer: ', data);
    toggleModal(true);
  }

  return (
    <Draggable>
      <Modal backdrop={false} fade={false} isOpen={isOpen}>
        <ModalHeader>You've been offered a job!</ModalHeader>
        <ModalBody className="job-offer-widget">
          <div className="text-center">
            <h3>Police Department</h3>
            <img
              className="business-logo"
              src="https://game.peakrp.com/habbo-imaging/badge/police.gif"
            />
            <div
              style={{
                background: '#001726',
                border: '1px solid #0b6395',
                width: 250,
                margin: '0 auto',
                padding: 5,
              }}
            >
              Cadet
            </div>
            <p className="mt-2">
              You will be paid <b>50c</b> every <b>10 minutes</b>
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <span>Decline</span>
          <button className="btn btn-outline-success ml-2">Accept</button>
        </ModalFooter>
      </Modal>
    </Draggable>
  );
}
