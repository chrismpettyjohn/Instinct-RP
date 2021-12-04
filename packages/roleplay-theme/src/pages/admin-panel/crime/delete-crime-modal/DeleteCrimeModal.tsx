import React from 'react';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
import {DeleteCrimeModalProps} from './DeleteCrimeModal.types';
import {DeleteModal} from '../../../../components/templates/delete-modal/DeleteModal';
import {crimeService} from '@instinct-plugin/roleplay-web';

export function DeleteCrimeModal({crime, onDelete}: DeleteCrimeModalProps) {
  async function onConfirmDelete() {
    try {
      await crimeService.deleteByID(`${crime.id}`);
      toast.success(`${crime.name} has been deleted successfully`);
      onDelete();
    } catch {
      toast.error(`${crime.name} could not be deleted`);
    }
  }

  return (
    <DeleteModal
      header={
        <>
          <Icon type="badge-sheriff" />
          Deleting Crime: <b>{crime.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {crime.name}.
    </DeleteModal>
  );
}
