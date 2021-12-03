import React, {useContext} from 'react';
import {sessionContext} from '@instinct-web/core';
import Select, {OnChangeValue} from 'react-select';
import {RoomSelectorProps} from './RoomSelector.types';
import {RPRoom} from '@instinct-plugin/roleplay-types';
import {useFetchRPRoomsByUsername} from '@instinct-plugin/roleplay-web';

export function RoomSelector({roomID, onChange}: RoomSelectorProps) {
  const {user} = useContext(sessionContext);
  const rooms = useFetchRPRoomsByUsername(user!.username);

  function onNewRoom(event: OnChangeValue<RPRoom, any>) {
    onChange(event as any);
  }

  return (
    <Select
      options={rooms ?? []}
      getOptionLabel={_ => _.roomName}
      getOptionValue={_ => _.id as any}
      value={rooms?.find(_ => _.id === roomID) ?? null}
      onChange={onNewRoom}
    />
  );
}
