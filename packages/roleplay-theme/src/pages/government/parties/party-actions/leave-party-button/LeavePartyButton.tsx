import {toast} from 'react-toastify';
import React, {useContext, useState} from 'react';
import {Icon, sessionContext} from '@instinct-web/core';
import {PartyActionsProps} from '../PartyActions.types';
import {politicalPartyService} from '../../../../../services/political-party';

export function LeavePartyButton({
  politicalParty,
  onChange,
}: PartyActionsProps) {
  const {user} = useContext(sessionContext);
  const [spinner, setSpinner] = useState(false);

  const belongsToGroup = politicalParty.members.find(_ => _.id === user!.id);

  if (!belongsToGroup) {
    return null;
  }

  if (politicalParty.founder.id === user!.id) {
    return null;
  }

  async function onConfirm() {
    try {
      if (spinner) return;
      setSpinner(true);
      await politicalPartyService.leaveByID(politicalParty.id);
      toast.info(`You have left the political party, ${politicalParty.name}`);
      onChange();
    } finally {
      setSpinner(false);
    }
  }

  const [buttonIcon, buttonText] = !spinner
    ? ['sign-out-alt', 'Leave']
    : ['spinner fa-spin', 'Leaving...'];

  return (
    <button
      className="btn btn-outline-warning mr-4"
      disabled={spinner}
      onClick={onConfirm}
    >
      <Icon type={buttonIcon} />
      {buttonText}
    </button>
  );
}
