import React from 'react';
import {toast} from 'react-toastify';
import {DeleteModal} from '../../../components/delete-modal/DeleteModal';
import {DeleteVendingMachineModalProps} from './DeleteVendingMachineModal.types';

export function DeleteVendingMachineModal({
  vendingMachine,
  onDelete,
}: DeleteVendingMachineModalProps) {
  async function onConfirmDelete() {
    toast.success(`${vendingMachine.name} has been deleted successfully`);
    onDelete();
  }

  return (
    <DeleteModal
      header={
        <>
          Deleting <b>{vendingMachine.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {vendingMachine.name}.
    </DeleteModal>
  );
}
