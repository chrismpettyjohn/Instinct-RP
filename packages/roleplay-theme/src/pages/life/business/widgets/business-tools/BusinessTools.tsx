import {Link} from 'wouter';
import React, {useContext} from 'react';
import {sessionContext, Icon} from '@instinct-web/core';
import {BusinessToolsProps} from './BusinessTools.types';
import {Card} from '../../../../../components/generic/card/Card';
import {DeleteBusinessModal} from './delete-business-modal/DeleteBusinessModal';

export function BusinessTools({business}: BusinessToolsProps) {
  const {user} = useContext(sessionContext);

  if (business.owner.id !== user!.id) {
    return null;
  }

  return (
    <Card className="text-center" header="Business Tools">
      <Link to={`/businesses/edit/${business.id}`}>
        <button className="btn btn-block btn-outline-info">
          <Icon type="pencil" />
          Edit
        </button>
      </Link>
      <DeleteBusinessModal business={business} />
    </Card>
  );
}
