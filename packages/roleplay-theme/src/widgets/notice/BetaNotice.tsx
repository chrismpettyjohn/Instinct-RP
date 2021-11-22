import React, {useContext} from 'react';
import {configContext, Icon} from '@instinct-web/core';

export function BetaNotice() {
  const {config} = useContext(configContext);

  if (!config.siteBeta) {
    return null;
  }

  return (
    <div className="float-right">
      <div className="bg-danger mt-2 mr-4 p-1" style={{borderRadius: 4}}>
        <Icon type="exclamation-triangle" />
        <b>Beta</b>
      </div>
    </div>
  );
}
