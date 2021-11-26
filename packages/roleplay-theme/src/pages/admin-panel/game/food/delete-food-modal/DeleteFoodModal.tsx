import React from 'react';
import {toast} from 'react-toastify';
import {DeleteFoodModalProps} from './DeleteFoodModal.types';
import {DeleteModal} from '../../../components/delete-modal/DeleteModal';

export function DeleteFoodModal({food, onDelete}: DeleteFoodModalProps) {
  async function onConfirmDelete() {
    toast.success(`${food.name} has been deleted successfully`);
    onDelete();
  }

  return (
    <DeleteModal
      header={
        <>
          Deleting <b>{food.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {food.name}.
    </DeleteModal>
  );
}
