import React from 'react';
import {Icon} from '@instinct-web/core';

export function NotAddedNotice() {
  return (
    <div
      className="alert alert-warning text-white"
      style={{background: '#FF5722'}}
    >
      <Icon type="exclamation-triangle" />
      <b className="mr-2">Heads up!</b>
      This feature has not been implemented yet
    </div>
  );
}
