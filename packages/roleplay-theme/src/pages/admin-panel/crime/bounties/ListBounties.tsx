import React from 'react';
import {CrimeLayout} from '../Crime';
import {setURL} from '@instinct-web/core';

setURL('rp-admin/crime/bounties', <ListBounties />);

export function ListBounties() {
  return <CrimeLayout>Coming Soon</CrimeLayout>;
}
