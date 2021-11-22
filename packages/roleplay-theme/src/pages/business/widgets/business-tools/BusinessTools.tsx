import React from 'react';
import {BusinessToolsProps} from './BusinessTools.types';
import {OpenPositionsModal} from './open-positions-modal/OpenPositionsModal';
import {EditBusinessButton} from './edit-business-button/EditBusinessButton';
import {DeleteBusinessModal} from './delete-business-modal/DeleteBusinessModal';

export function BusinessTools({business}: BusinessToolsProps) {
  return (
    <>
      <OpenPositionsModal business={business} />
      <hr />
      <EditBusinessButton business={business} />
      <DeleteBusinessModal business={business} />
    </>
  );
}
