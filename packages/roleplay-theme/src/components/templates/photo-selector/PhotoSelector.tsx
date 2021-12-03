import Moment from 'moment';
import React, {useContext} from 'react';
import {OnChangeValue} from 'react-select';
import {Photo} from '@instinct-prj/interface';
import {sessionContext, Select} from '@instinct-web/core';
import {PhotoSelectorProps} from './PhotoSelector.types';
import {useFetchPhotosByUsername} from '@instinct-plugin/roleplay-web';

export function PhotoSelector({photoID, onChange}: PhotoSelectorProps) {
  const {user} = useContext(sessionContext);
  const photos = useFetchPhotosByUsername(user!.username);

  function onNewPhoto(event: OnChangeValue<Photo, any>) {
    onChange(event as any);
  }

  return (
    <Select
      options={photos ?? []}
      getOptionLabel={_ =>
        `Photo ${Moment.unix(_.createdAt).format('MMM DD, YYYY')} #${_.id}`
      }
      getOptionValue={_ => _.id as any}
      value={photos?.find(_ => _.id === photoID) ?? null}
      onChange={onNewPhoto}
    />
  );
}
