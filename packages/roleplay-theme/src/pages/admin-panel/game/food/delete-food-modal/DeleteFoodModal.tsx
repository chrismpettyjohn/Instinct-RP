import React from 'react';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
import {DeleteFoodModalProps} from './DeleteFoodModal.types';
import {DeleteModal} from '../../../components/delete-modal/DeleteModal';
import {foodService} from '@instinct-plugin/roleplay-web';

export function DeleteFoodModal({food, onDelete}: DeleteFoodModalProps) {
  async function onConfirmDelete() {
    try {
      await foodService.deleteByID(`${food.id}`);
      toast.success(`${food.name} has been deleted successfully`);
      onDelete();
    } catch {
      toast.error(`${food.name} could not be deleted`);
    }
  }

  return (
    <DeleteModal
      header={
        <>
          <Icon type="drumstick" />
          Deleting Food: <b>{food.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {food.name}.
    </DeleteModal>
  );
}
