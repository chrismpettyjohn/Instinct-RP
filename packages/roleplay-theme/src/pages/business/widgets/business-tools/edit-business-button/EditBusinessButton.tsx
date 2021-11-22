import {Link} from 'wouter';
import React, {useContext} from 'react';
import {BusinessToolsProps} from '../BusinessTools.types';
import {Icon, sessionContext} from '@instinct-web/core';

export function EditBusinessButton({business}: BusinessToolsProps) {
  const {user} = useContext(sessionContext);

  if (business.owner.id !== user!.id) {
    return null;
  }

  return (
    <Link to={`/businesses/edit/${business.id}`}>
      <button className="btn btn-block btn-outline-info">
        <Icon type="pencil" />
        Edit
      </button>
    </Link>
  );
}
