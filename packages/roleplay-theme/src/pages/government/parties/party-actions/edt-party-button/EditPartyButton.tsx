import {Link} from 'wouter';
import React, {useContext} from 'react';
import {Icon, sessionContext} from '@instinct-web/core';
import {PartyActionsProps} from '../PartyActions.types';

export function EditPartyButton({politicalParty}: PartyActionsProps) {
  const {user} = useContext(sessionContext);

  if (politicalParty.founder.id !== user!.id) {
    return null;
  }

  return (
    <Link to={`/government/parties/edit/${politicalParty.id}`}>
      <button className="btn btn-outline-info mr-4">
        <Icon type="pencil" />
        Edit
      </button>
    </Link>
  );
}
