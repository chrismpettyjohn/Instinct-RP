import React from 'react';
import {CrimeLayout} from '../Crime';
import {setURL} from '@instinct-web/core';

setURL('rp-admin/crime/laws', <ListLaws />);

export function ListLaws() {
  return <CrimeLayout>Coming Soon</CrimeLayout>;
}
