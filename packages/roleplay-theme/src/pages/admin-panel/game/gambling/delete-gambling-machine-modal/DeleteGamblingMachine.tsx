import React from 'react';
import {toast} from 'react-toastify';
import {DeleteModal} from '../../../components/delete-modal/DeleteModal';
import {DeleteGamblingMachineProps} from './DeleteGamblingMachine.types';

export function DeleteGamblingMachine({
  gamblingMachine,
  onDelete,
}: DeleteGamblingMachineProps) {
  async function onConfirmDelete() {
    toast.success(`${gamblingMachine.name} has been deleted successfully`);
    onDelete();
  }

  return (
    <DeleteModal
      header={
        <>
          Deleting <b>{gamblingMachine.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {gamblingMachine.name}.
    </DeleteModal>
  );
}
