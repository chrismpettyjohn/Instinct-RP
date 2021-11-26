import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {VendingMachine} from '@instinct-plugin/roleplay-types';
import {EditVendingMachineProps} from './EditVendingMachine.types';
import {EditModal} from '../../../components/edit-modal/EditModal';
import {vendingMachineService} from '@instinct-plugin/roleplay-web';

export function EditVendingMachineModal({
  vendingMachine,
  onChange,
}: EditVendingMachineProps) {
  const [vendingMachineDTO, setVendingMachineDTO] = useState(vendingMachine);

  function updateVendingMachineDTO(changes: Partial<VendingMachine>) {
    setVendingMachineDTO(_ => ({
      ..._,
      ...changes,
    }));
  }

  async function onSubmit() {
    try {
      await vendingMachineService.updateByID(
        `${vendingMachine.id}`,
        vendingMachineDTO
      );
      toast.success(`${vendingMachineDTO.name} has been updated successfully`);
      onChange();
    } catch {
      toast.error(`${vendingMachineDTO.name} could not be updated`);
    }
  }

  return (
    <EditModal
      header={
        <>
          <Icon type="coin" />
          Editing Vending Machine: <b>{vendingMachine.name}</b>
        </>
      }
      onSubmit={onSubmit}
    >
      <Form submit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={vendingMachineDTO.name}
            onChange={_ => updateVendingMachineDTO({name: _.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Cost</Label>
          <Input
            type="number"
            value={vendingMachineDTO.cost}
            onChange={_ =>
              updateVendingMachineDTO({cost: Number(_.target.value)})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Health Gained</Label>
          <Input
            type="number"
            value={vendingMachineDTO.healthGained}
            onChange={_ =>
              updateVendingMachineDTO({healthGained: Number(_.target.value)})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Hunger Restored</Label>
          <Input
            type="number"
            value={vendingMachineDTO.hungerRestored}
            onChange={_ =>
              updateVendingMachineDTO({hungerRestored: Number(_.target.value)})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Energy Gained</Label>
          <Input
            type="number"
            value={vendingMachineDTO.energyGained}
            onChange={_ =>
              updateVendingMachineDTO({energyGained: Number(_.target.value)})
            }
          />
        </FormGroup>
      </Form>
    </EditModal>
  );
}
