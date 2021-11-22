import React, {useState} from 'react';
import Draggable from 'react-draggable';
import {gangService} from '../../services/gang';
import {Avatar} from '@instinct-web/core';
import {useWebSocketEventListener} from '../../hooks/web-socket';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {
  Gang,
  WebSocketIncomingGangInfoEvent,
} from '@instinct-plugin/roleplay-types';

export function GangInfoWidget() {
  const [gang, setGang] = useState<Gang>();
  useWebSocketEventListener('gang_info', onInfoReceived);

  async function onInfoReceived({gang_id}: WebSocketIncomingGangInfoEvent) {
    const gangData = await gangService.getByID(gang_id);
    setGang(gangData);
  }

  if (!gang) {
    return null;
  }

  return (
    <Draggable>
      <Modal backdrop={false} fade={false} isOpen>
        <ModalHeader>Gang Information</ModalHeader>
        <ModalBody className="job-offer-widget">
          <div className="row">
            <div className="col-2">
              <img
                className="business-logo"
                src={`/img/corps/${gang.badge}.gif`}
              />
            </div>
            <div className="col-10">
              <h2 className="mt-1">{gang.name}</h2>
              <h5 style={{marginTop: -10}}>
                Founded by <b>{gang.owner.username}</b>
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h3>Members</h3>
            </div>
            <div style={{maxHeight: 300, overflowY: 'scroll', width: '100%'}}>
              {gang.ranks.map(rank => (
                <div className="col-6" key={rank.id}>
                  {rank.users.map(_ => (
                    <div className="member-container" key={_.id}>
                      <div className="member-content flex-container flex-vertical-center">
                        <div
                          className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                          style={{overflow: 'hidden'}}
                        >
                          <Avatar look={_.figure} />
                        </div>
                        <div className="member-details">
                          <div className="details-username">{_.username}</div>
                          <div className="badge badge-danger text-white p-1">
                            {rank.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="row text-right">
            <button
              className="btn btn-outline-danger ml-2"
              onClick={() => setGang(undefined)}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </Draggable>
  );
}
