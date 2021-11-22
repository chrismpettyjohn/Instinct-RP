import React from 'react';
import {AboutModalProps} from './AboutModal.types';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

export function AboutModal({isOpen, onToggle}: AboutModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={onToggle}>
      <ModalHeader>
        <img src="https://i.imgur.com/Bi8D2aL.png" />
        Instinct Roleplay Edition
      </ModalHeader>
      <ModalBody>
        <h5>About</h5>
        <p>
          Instinct Roleplay Edition is the next generation of content management
          systems.
        </p>
        <p>
          It's state of the art architecture has been designed from the ground
          up to mold the fastest, most secure, feature rich RP CMS to date.
        </p>
        <p>
          That's not all. Instinct is still being worked on and receiving
          constant updates to ensure a seamless experience for everybody.
        </p>
        <h5>Who Made Instinct?</h5>
        <p>
          <b>LeChris</b> is the sole creator of Instinct.
        </p>
        <iframe
          width={450}
          height={315}
          frameBorder={0}
          allowFullScreen
          src="https://www.youtube.com/embed/bt-IM0XJYOo?autoplay=1&modestbranding=1&rel=0&controls=0&loop=1&autohide=1&start=55"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </ModalBody>
    </Modal>
  );
}
