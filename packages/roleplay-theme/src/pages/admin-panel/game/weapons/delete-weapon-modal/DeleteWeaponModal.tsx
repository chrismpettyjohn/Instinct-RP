import React from 'react';
import {toast} from 'react-toastify';
import {DeleteWeaponModalProps} from './DeleteWeaponModal.types';
import {DeleteModal} from '../../../components/delete-modal/DeleteModal';

export function DeleteWeaponModal({weapon, onDelete}: DeleteWeaponModalProps) {
  async function onConfirmDelete() {
    toast.success(`${weapon.name} has been deleted successfully`);
    onDelete();
  }

  return (
    <DeleteModal
      header={
        <>
          Deleting <b>{weapon.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {weapon.name}.
    </DeleteModal>
  );
}
