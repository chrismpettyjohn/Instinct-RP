import React from 'react';
import {toast} from 'react-toastify';
import {Icon} from '@instinct-web/core';
import {DeleteWeaponModalProps} from './DeleteWeaponModal.types';
import {DeleteModal} from '../../../components/delete-modal/DeleteModal';
import {weaponService} from '@instinct-plugin/roleplay-web';

export function DeleteWeaponModal({weapon, onDelete}: DeleteWeaponModalProps) {
  async function onConfirmDelete() {
    try {
      await weaponService.deleteByID(`${weapon.id}`);
      toast.success(`${weapon.name} has been deleted successfully`);
      onDelete();
    } catch {
      toast.error(`${weapon.name} could not be deleted`);
    }
  }

  return (
    <DeleteModal
      header={
        <>
          <Icon type="axe" />
          Deleting Weapon: <b>{weapon.name}</b>
        </>
      }
      onDelete={onConfirmDelete}
    >
      You are about to permanently delete {weapon.name}.
    </DeleteModal>
  );
}
