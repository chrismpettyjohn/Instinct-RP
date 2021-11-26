import Toggle from 'react-toggle';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Crime} from '@instinct-plugin/roleplay-types';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {EditCrimeModalProps} from './EditCrimeModal.types';
import {EditModal} from '../../components/edit-modal/EditModal';
import {crimeService} from '@instinct-plugin/roleplay-web';

export function EditCrimeModal({crime, onChange}: EditCrimeModalProps) {
  const [crimeDTO, setCrimeDTO] = useState(crime);

  function updateCrimeDTO(changes: Partial<Crime>) {
    setCrimeDTO(_ => ({
      ..._,
      ...changes,
    }));
  }

  async function onSubmit() {
    try {
      await crimeService.updateByID(`${crime.id}`, crimeDTO);
      toast.success(`${crime.name} has been updated successfully`);
      onChange();
    } catch {
      toast.error(`${crime.name} could not be updated`);
    }
  }

  return (
    <EditModal
      header={
        <>
          <Icon type="badge-sheriff" />
          Editing Crime: <b>{crime.name}</b>
        </>
      }
      onSubmit={onSubmit}
    >
      <Form submit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={crimeDTO.name}
            onChange={_ => updateCrimeDTO({name: _.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Alias</Label>
          <Input
            value={crimeDTO.aliases}
            onChange={_ => updateCrimeDTO({aliases: _.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <Label>Jail Time</Label>
          <small className="ml-2">Jail time is registered in minutes</small>
          <Input
            type="number"
            value={crimeDTO.jailTimeInMinutes}
            onChange={_ =>
              updateCrimeDTO({jailTimeInMinutes: Number(_.target.value)})
            }
          />
        </FormGroup>
        <div className="row">
          <div className="col-4">
            <FormGroup>
              <Label>Is Ticket</Label>
              <br />
              <Toggle
                checked={crimeDTO.ticketable}
                onChange={_ =>
                  updateCrimeDTO({ticketable: !crimeDTO.ticketable})
                }
              />
            </FormGroup>
          </div>
          <div className="col-8">
            <FormGroup>
              <Label>Ticket Fine</Label>
              <Input
                disabled={!crimeDTO.ticketable}
                type="number"
                value={crimeDTO.ticketCost}
                onChange={_ =>
                  updateCrimeDTO({ticketCost: Number(_.target.value)})
                }
              />
            </FormGroup>
          </div>
        </div>
        <FormGroup>
          <Label>Is Stackable</Label>
          <br />
          <Toggle
            checked={crimeDTO.stackable}
            onChange={_ => updateCrimeDTO({stackable: !crimeDTO.stackable})}
          />
        </FormGroup>
      </Form>
    </EditModal>
  );
}
