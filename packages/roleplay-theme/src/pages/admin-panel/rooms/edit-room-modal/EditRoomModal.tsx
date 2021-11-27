import Toggle from 'react-toggle';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {roomPermissionToLabel} from '../rooms.const';
import {RPRoom} from '@instinct-plugin/roleplay-types';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {EditRoomModalProps} from './EditRoomModal.types';
import {rpRoomService} from '@instinct-plugin/roleplay-web';
import {EditModal} from '../../components/edit-modal/EditModal';

export function EditRoomModal({rpRoom, onChange}: EditRoomModalProps) {
  const [rpRoomDTO, setRPRoomDTO] = useState(rpRoom);

  function updateRPRoomDTO(changes: Partial<RPRoom>) {
    setRPRoomDTO(_ => ({
      ..._,
      ...changes,
    }));
  }

  async function onSubmit() {
    try {
      await rpRoomService.updateByID(`${rpRoom.id}`, rpRoomDTO);
      toast.success(`${rpRoom.roomName} has been updated successfully`);
      onChange();
    } catch {
      toast.error(`${rpRoom.roomName} could not be updated`);
    }
  }

  return (
    <EditModal
      header={
        <>
          <Icon type="map-marker" />
          Editing Room: <b>{rpRoom.roomName}</b>
        </>
      }
      onSubmit={onSubmit}
    >
      <Form submit={onSubmit}>
        <FormGroup>
          <Label>Room Name</Label>
          <Input value={rpRoomDTO.roomName} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Enter Message</Label>
          <Input
            value={rpRoomDTO.enterMessage}
            onChange={_ => updateRPRoomDTO({enterMessage: _.target.value})}
          />
        </FormGroup>
        <h4>Abilities</h4>
        <div className="row">
          {Object.keys(roomPermissionToLabel).map(_ => (
            <div
              className="col-4"
              key={`room_${rpRoom.id}_permission_modal_${_}`}
            >
              <FormGroup>
                <Label>{roomPermissionToLabel[_]}</Label>
                <br />
                <Toggle
                  // @ts-ignore
                  checked={rpRoomDTO[_]}
                  // @ts-ignore
                  onChange={_ => updateRPRoomDTO({[_]: !rpRoomDTO[_]})}
                />
              </FormGroup>
            </div>
          ))}
        </div>
      </Form>
    </EditModal>
  );
}
