import React, {useContext} from 'react';
import {configContext} from '@instinct-web/core';
import {AboutModalProps} from './AboutModal.types';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

export function AboutModal({isOpen, onToggle}: AboutModalProps) {
  const {config} = useContext(configContext);

  return (
    <Modal isOpen={isOpen} toggle={onToggle}>
      <ModalHeader>
        <img src="https://i.imgur.com/Bi8D2aL.png" />
        Instinct Roleplay Edition
      </ModalHeader>
      <ModalBody>
        <h5>About</h5>
        <p>
          Instinct is a CMS built with the latest technology give you an
          experience that's out of this world.
        </p>
        <p>
          From the ground up, all of Instinct is built from scratch using a
          combination of technology, including Typescript, Node and React.
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
