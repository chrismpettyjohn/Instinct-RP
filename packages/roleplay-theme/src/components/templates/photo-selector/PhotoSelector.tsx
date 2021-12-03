import Moment from 'moment';
import React from 'react';
import {OnChangeValue} from 'react-select';
import {Photo} from '@instinct-prj/interface';
import {Select} from '@instinct-web/core';
import {PhotoSelectorProps} from './PhotoSelector.types';

export function PhotoSelector({photos, photoID, onChange}: PhotoSelectorProps) {
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
