import Draggable from 'react-draggable';
import React, {useContext, useState} from 'react';
import {webSocketContext} from '../../context/web-socket';
import {useWebSocketEventListener} from '@instinct-plugin/roleplay-web';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {WebSocketIncomingGangInviteReceivedEvent} from '@instinct-plugin/roleplay-types';

export function GangInviteWidget() {
  const {sendEvent} = useContext(webSocketContext);
  useWebSocketEventListener('gang_invite_received', onInviteReceived);
  const [gangInvite, setGangInvite] =
    useState<WebSocketIncomingGangInviteReceivedEvent>();

  function onInviteReceived(data: WebSocketIncomingGangInviteReceivedEvent) {
    setGangInvite(data);
  }

  async function onDecision(decision: boolean) {
    if (decision) {
      sendEvent('gang_invite_decision', {
        decision,
        gang_id: gangInvite!.gang_id,
        gang_rank: gangInvite!.gang_rank,
        sender_id: gangInvite!.sender_id,
      });
    }
    setGangInvite(undefined);
  }

  if (!gangInvite) {
    return null;
  }

  return (
    <Draggable>
      <Modal backdrop={false} fade={false} isOpen>
        <ModalHeader>You've been invited to join a gang!</ModalHeader>
        <ModalBody className="job-offer-widget">
          <div className="text-center text-uppercase">
            <h2>{gangInvite.gang_name}</h2>
            <img
              className="business-logo"
              src={`/img/corps/${gangInvite.gang_badge}.gif`}
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
              {gangInvite.rank_name}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="row text-right">
            <div
              className="mt-2 mr-3"
              style={{cursor: 'pointer'}}
              onClick={() => onDecision(false)}
            >
              Decline
            </div>
            <button
              className="btn btn-outline-success ml-2"
              onClick={() => onDecision(true)}
            >
              Accept
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </Draggable>
  );
}
