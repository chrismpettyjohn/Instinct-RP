import React from 'react';
import {GameLayout} from '../Game';
import {setURL} from '@instinct-web/core';

setURL('rp-admin/game/weapons', <ListWeapons />);

export function ListWeapons() {
  return <GameLayout>Coming Soon</GameLayout>;
}
