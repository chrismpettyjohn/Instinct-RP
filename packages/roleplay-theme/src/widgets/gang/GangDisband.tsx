import Draggable from 'react-draggable';
import React, {useContext, useState} from 'react';
import {webSocketContext} from '../../context/web-socket';
import {useWebSocketEventListener} from '@instinct-plugin/roleplay-web';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {WebSocketIncomingGangDisbandConfirmationEvent} from '@instinct-plugin/roleplay-types';

export function GangDisbandWidget() {
  const {sendEvent} = useContext(webSocketContext);
  const [gang, setGang] =
    useState<WebSocketIncomingGangDisbandConfirmationEvent>();
  useWebSocketEventListener('gang_disband_confirmation', onDisbandReceived);

  function onDisbandReceived(
    data: WebSocketIncomingGangDisbandConfirmationEvent
  ) {
    setGang(data);
  }

  async function onDecision(disband: boolean) {
    if (disband) {
      sendEvent('gang_disband_confirm', {});
    }

    setGang(undefined);
  }

  if (!gang) {
    return null;
  }

  return (
    <Draggable>
      <Modal backdrop={false} fade={false} isOpen>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalBody className="job-offer-widget">
          <div className="text-center">
            <h3>You are about to delete your gang,</h3>
            <h2>{gang.gang_name}</h2>
            <img
              className="business-logo"
              src={`/img/corps/${gang.gang_badge}.gif`}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="row text-right">
            <div
              className="mt-2 mr-3"
              style={{cursor: 'pointer'}}
              onClick={() => onDecision(false)}
            >
              Cancel
            </div>
            <button
              className="btn btn-outline-danger ml-2"
              onClick={() => onDecision(true)}
            >
              Yes, I want to delete.
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </Draggable>
  );
}
