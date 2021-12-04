import React from 'react';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
import {DeleteModal} from '../../../../../components/templates/delete-modal/DeleteModal';
import {DeleteGamblingMachineProps} from './DeleteGamblingMachine.types';
import {gamblingMachineService} from '@instinct-plugin/roleplay-web';

export function DeleteGamblingMachine({
  gamblingMachine,
  onDelete,
}: DeleteGamblingMachineProps) {
  async function onConfirmDelete() {
    try {
      await gamblingMachineService.deleteByID(`${gamblingMachine.id}`);
      toast.success(`${gamblingMachine.name} has been deleted successfully`);
      onDelete();
    } catch {
      toast.error(`${gamblingMachine.name} could not be deleted`);
    }
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
