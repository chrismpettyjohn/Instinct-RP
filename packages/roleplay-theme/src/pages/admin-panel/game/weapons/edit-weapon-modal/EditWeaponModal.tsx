import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Weapon} from '@instinct-plugin/roleplay-types';

import {Form, FormGroup, Input, Label} from 'reactstrap';
import {EditWeaponModalProps} from './EditWeaponModal.types';
import {EditModal} from '../../../components/edit-modal/EditModal';

export function EditWeaponModal({weapon, onChange}: EditWeaponModalProps) {
  const [weaponDTO, setWeaponDTO] = useState(weapon);

  function updateWeaponDTO(changes: Partial<Weapon>) {
    setWeaponDTO(_ => ({
      ..._,
      ...changes,
    }));
  }

  async function onSubmit() {
    toast.success(`${weaponDTO.name} has been updated successfully`);
    onChange();
  }

  return (
    <EditModal
      header={
        <>
          <Icon type="axe" />
          Editing Weapon <b>{weapon.name}</b>
        </>
      }
      onSubmit={onSubmit}
    >
      <Form submit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={weaponDTO.name}
            onChange={_ => updateWeaponDTO({name: _.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Cost</Label>
          <Input
            type="number"
            value={weaponDTO.cost}
            onChange={_ => updateWeaponDTO({cost: Number(_.target.value)})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Minimum Damage</Label>
          <Input
            type="number"
            value={weaponDTO.minDamage}
            onChange={_ => updateWeaponDTO({minDamage: Number(_.target.value)})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Maximum Damage</Label>
          <Input
            type="number"
            value={weaponDTO.maxDamage}
            onChange={_ => updateWeaponDTO({maxDamage: Number(_.target.value)})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Maximum Range</Label>
          <Input
            type="number"
            value={weaponDTO.range}
            onChange={_ => updateWeaponDTO({range: Number(_.target.value)})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Energy Used</Label>
          <Input
            type="number"
            value={weaponDTO.energyUsed}
            onChange={_ =>
              updateWeaponDTO({energyUsed: Number(_.target.value)})
            }
          />
        </FormGroup>
      </Form>
    </EditModal>
  );
}
