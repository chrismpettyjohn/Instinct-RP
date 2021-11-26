import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {GamblingMachine} from '@instinct-plugin/roleplay-types';
import {EditGamblingModalProps} from './EditGamblingModal.types';
import {EditModal} from '../../../components/edit-modal/EditModal';
import {gamblingMachineService} from '@instinct-plugin/roleplay-web';

export function EditGamblingModal({
  gamblingMachine,
  onChange,
}: EditGamblingModalProps) {
  const [gamblingMachineDTO, setGamblingMachineDTO] = useState(gamblingMachine);

  function updateGamblingMachineDTO(changes: Partial<GamblingMachine>) {
    setGamblingMachineDTO(_ => ({
      ..._,
      ...changes,
    }));
  }

  async function onSubmit() {
    try {
      await gamblingMachineService.updateByID(
        `${gamblingMachine.id}`,
        gamblingMachineDTO
      );
      toast.success(`${gamblingMachineDTO.name} has been updated successfully`);
      onChange();
    } catch {
      toast.error(`${gamblingMachineDTO.name} could not be updated`);
    }
  }

  return (
    <EditModal
      header={
        <>
          <Icon type="dice-two" />
          Editing Gambling Machine: <b>{gamblingMachine.name}</b>
        </>
      }
      onSubmit={onSubmit}
    >
      <Form submit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={gamblingMachineDTO.name}
            onChange={_ => updateGamblingMachineDTO({name: _.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <Input
            value={gamblingMachineDTO.type}
            onChange={_ =>
              updateGamblingMachineDTO({type: _.target.value as any})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Minimum Bet</Label>
          <Input
            type="number"
            value={gamblingMachineDTO.minimumBet}
            onChange={_ =>
              updateGamblingMachineDTO({minimumBet: Number(_.target.value)})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Maximum Bet</Label>
          <Input
            type="number"
            value={gamblingMachineDTO.maximumBet}
            onChange={_ =>
              updateGamblingMachineDTO({maximumBet: Number(_.target.value)})
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Multiplier</Label>
          <Input
            type="number"
            value={gamblingMachineDTO.multiplier}
            onChange={_ =>
              updateGamblingMachineDTO({multiplier: Number(_.target.value)})
            }
          />
        </FormGroup>
      </Form>
    </EditModal>
  );
}
