import React from 'react';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
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
          <Icon type="dice-two" />
          Deleting Gambling Machine: <b>{gamblingMachine.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {gamblingMachine.name}.
    </DeleteModal>
  );
}
