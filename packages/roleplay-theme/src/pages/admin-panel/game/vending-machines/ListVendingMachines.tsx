import React from 'react';
import {GameLayout} from '../Game';
import {setURL} from '@instinct-web/core';

setURL('rp-admin/game/vending-machines', <ListVendingMachines />);

export function ListVendingMachines() {
  return <GameLayout>Coming Soon</GameLayout>;
}
