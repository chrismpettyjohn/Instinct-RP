import React from 'react';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
import {DeleteModal} from '../../../../../components/templates/delete-modal/DeleteModal';
import {DeleteVendingMachineModalProps} from './DeleteVendingMachineModal.types';
import {vendingMachineService} from '@instinct-plugin/roleplay-web';

export function DeleteVendingMachineModal({
  vendingMachine,
  onDelete,
}: DeleteVendingMachineModalProps) {
  async function onConfirmDelete() {
    try {
      await vendingMachineService.deleteByID(`${vendingMachine.id}`);
      toast.success(`${vendingMachine.name} has been deleted successfully`);
      onDelete();
    } catch {
      toast.error(`${vendingMachine.name} could not be deleted`);
    }
  }

  return (
    <DeleteModal
      header={
        <>
          <Icon type="coin" />
          Deleting Vending Machine: <b>{vendingMachine.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {vendingMachine.name}.
    </DeleteModal>
  );
}
