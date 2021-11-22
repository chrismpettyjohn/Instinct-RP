import React from 'react';
import {Row} from 'reactstrap';
import {PartyActionsProps} from './PartyActions.types';
import {JoinPartyButton} from './join-party-button/JoinPartyButton';
import {LeavePartyButton} from './leave-party-button/LeavePartyButton';
import {DeletePartyButton} from './delete-party-modal/DeletePartyModal';
import {EditPartyButton} from './edt-party-button/EditPartyButton';

export function PartyActions({politicalParty, onChange}: PartyActionsProps) {
  return (
    <Row>
      <div className="col-6" style={{borderRight: '1px solid white'}}>
        <h4>Membership</h4>
        <JoinPartyButton politicalParty={politicalParty} onChange={onChange} />
        <LeavePartyButton politicalParty={politicalParty} onChange={onChange} />
      </div>
      <div className="col-6">
        <h4>Other</h4>
        <EditPartyButton politicalParty={politicalParty} onChange={onChange} />
        <DeletePartyButton
          politicalParty={politicalParty}
          onChange={onChange}
        />
      </div>
    </Row>
  );
}
