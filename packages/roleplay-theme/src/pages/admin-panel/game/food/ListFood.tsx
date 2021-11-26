import React from 'react';
import {GameLayout} from '../Game';
import {setURL} from '@instinct-web/core';

setURL('rp-admin/game/food', <ListFood />);

export function ListFood() {
  return <GameLayout>Coming Soon</GameLayout>;
}
