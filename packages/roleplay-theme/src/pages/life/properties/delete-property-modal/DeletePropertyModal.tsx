import React from 'react';
import {useLocation} from 'wouter';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
import {propertyService} from '@instinct-plugin/roleplay-web';
import {DeletePropertyModalProps} from './DeletePropertyModal.types';
import {DeleteModal} from '../../../../components/templates/delete-modal/DeleteModal';

export function DeletePropertyModal({property}: DeletePropertyModalProps) {
  const [location, setLocation] = useLocation();
  async function onConfirmDelete() {
    try {
      await propertyService.deleteByID(`${property.id}`);
      toast.success(
        `The listing for ${property.room.roomName} has been deleted successfully`
      );
      setLocation('/properties');
    } catch {
      toast.error(`${property.room.roomName} could not be deleted`);
    }
  }

  return (
    <DeleteModal
      header={
        <>
          <Icon type="badge-sheriff" />
          Deleting Property: <b>{property.room.roomName}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      <p>
        You are about to permanently delete the listing for{' '}
        {property.room.roomName}.
      </p>
      <p>
        Once deleted, all bids will be refunded and your property will be taken
        off the market.
      </p>
    </DeleteModal>
  );
}
