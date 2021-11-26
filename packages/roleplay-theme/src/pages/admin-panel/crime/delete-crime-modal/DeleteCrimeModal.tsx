import React from 'react';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
import {DeleteCrimeModalProps} from './DeleteCrimeModal.types';
import {DeleteModal} from '../../components/delete-modal/DeleteModal';

export function DeleteCrimeModal({crime, onDelete}: DeleteCrimeModalProps) {
  async function onConfirmDelete() {
    toast.success(`${crime.name} has been deleted successfully`);
    onDelete();
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
