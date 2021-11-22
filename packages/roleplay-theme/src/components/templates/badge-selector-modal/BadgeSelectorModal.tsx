import './BadgeSelectorModal.scss';
import React, {useContext, useState} from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {badges, configContext} from '@instinct-web/core';
import {BadgeSelectorModalProps} from './BadgeSelectorModal.types';

export function BadgeSelectorModal({badge, onChange}: BadgeSelectorModalProps) {
  const {config} = useContext(configContext);
  const [showModal, setModal] = useState(false);

  function onToggle() {
    setModal(_ => !showModal);
  }

  return (
    <>
      <img
        className="business-badge"
        src={`${config.swfBadgeURL}/${badge}.gif`}
        onClick={onToggle}
      />
      <Modal isOpen={showModal} toggle={onToggle}>
        <ModalHeader toggle={onToggle}>Badge Picker</ModalHeader>
        <ModalBody>
          <div className="row" style={{height: 400, overflowY: 'scroll'}}>
            {badges.map(badgeRow => (
              <div className="col-3" key={badgeRow}>
                <img
                  className={`business-badge ${
                    badgeRow === badge ? 'active-badge' : ''
                  }`}
                  src={`${config.swfBadgeURL}/${badgeRow}.gif`}
                  onClick={() => onChange(badgeRow)}
                />
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
