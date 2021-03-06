import {configContext} from '@instinct-web/core';
import React, {useContext, useState} from 'react';
import {GroupContainerProps} from './GroupContainer.types';
import {ModalOverlay} from '../../../../../components/generic/modal/modal-overlay/ModalOverlay';

export function GroupContainer({group}: GroupContainerProps) {
  const {config} = useContext(configContext);
  const [showModal, setModal] = useState<boolean>(false);

  function toggleModal(): void {
    setModal(!showModal);
  }

  return (
    <>
      <img
        alt={`${group.name} badge`}
        src={`${config.groupBadgeURL}/${group.badge}.png`}
        onClick={toggleModal}
        style={{cursor: 'pointer'}}
      />
      <ModalOverlay
        header={group.name}
        isOpen={showModal}
        onToggle={toggleModal}
      >
        <p>Group pages are coming soon.</p>
      </ModalOverlay>
    </>
  );
}
