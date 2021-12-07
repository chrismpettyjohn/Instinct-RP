import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {CrimeDetailsModalProps} from './CrimeDetailsModal.types';

export function CrimeDetailsModal({crime}: CrimeDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  const aliases = crime.aliases?.split(',') ?? [];

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <Icon type="badge-sheriff" />
            Viewing Crime: <b>{crime.name}</b>
          </ModalHeader>
          <ModalBody>
            <h3>Description</h3>
            <p>{crime.description}</p>
            <h3>Aliases</h3>
            {aliases.map(_ => (
              <div className="badge badge-primary mr-2" key={`alias_${_}`}>
                {_}
              </div>
            ))}
          </ModalBody>
        </Modal>
      )}
      <span style={{cursor: 'pointer'}} onClick={toggleModal}>
        <Icon type="link" /> {crime.name}
      </span>
    </>
  );
}
