import React, {useContext} from 'react';
import {BusinessToolsProps} from '../BusinessTools.types';
import {Icon, sessionContext} from '@instinct-web/core';

export function OpenPositionsModal({business}: BusinessToolsProps) {
  const {user} = useContext(sessionContext);

  if (business.owner.id !== user!.id) {
    return null;
  }

  return (
    <>
      <button className="btn btn-block btn-outline-info">
        <Icon type="file-alt" />
        Open Positions
      </button>
    </>
  );
}
