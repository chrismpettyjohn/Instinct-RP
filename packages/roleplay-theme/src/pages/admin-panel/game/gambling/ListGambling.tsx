import React from 'react';
import {GameLayout} from '../Game';
import {setURL} from '@instinct-web/core';

setURL('rp-admin/game/gambling', <ListGambling />);

export function ListGambling() {
  return <GameLayout>Coming Soon</GameLayout>;
}
