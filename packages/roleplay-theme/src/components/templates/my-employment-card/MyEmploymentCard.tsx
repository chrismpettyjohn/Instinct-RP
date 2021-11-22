import Moment from 'moment';
import './MyEmploymentCard.scss';
import {Row} from '../../generic/row';
import React, {useContext} from 'react';
import {Icon} from '../../generic/icon/Icon';
import {Card} from '../../generic/card/Card';
import {configContext} from '@instinct-web/core';
import {MyEmploymentCardProps} from './MyEmploymentCard.types';
import {EmploymentBlock} from './employment-block/EmploymentBlock';

export function MyEmploymentCard({user}: MyEmploymentCardProps) {
  const {config} = useContext(configContext);

  const [currentHealth, maximumHealth] = [
    user.rpStats.health.current ?? 0,
    user.rpStats.health.maximum ?? 100,
  ];

  const [currentEnergy, maximumEnergy] = [
    user.rpStats.energy.current ?? 0,
    user.rpStats.energy.maximum ?? 100,
  ];

  function safeDivide(divide: number, by: number): number {
    return divide >= by ? 100 : !!divide && !!by ? Number(divide / by) : 0;
  }

  return (
    <Card>
      <Row>
        <div className="col-6 mb-4">
          <h4>Health</h4>
          <div className="progress">
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{width: `${safeDivide(currentHealth, maximumHealth)}%`}}
              aria-valuenow={currentHealth}
              aria-valuemax={100}
            />
          </div>
        </div>
        <div className="col-6 mb-4">
          <b>Energy</b>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{width: `${safeDivide(currentEnergy, maximumEnergy)}%`}}
              aria-valuenow={currentEnergy}
              aria-valuemax={100}
            />
          </div>
        </div>
        <div className="col-6 mb-4">
          <h4>Wallet</h4>
          <p>${Number(user.credits).toLocaleString()}</p>
        </div>
        <div className="col-6 mb-4">
          <b>Last Online</b>
          <p>{Moment(user.lastLoginDate).format('MMMM DD, YYYY')}</p>
        </div>
        <div className="col-6 mb-4">
          <b>Employment</b>
          {user.rpStats.job && (
            <EmploymentBlock
              badge={`${config.swfBadgeURL}/${
                user.rpStats.job!.businessBadge
              }.gif`}
              position={user.rpStats.job!.positionName}
              name={user.rpStats!.job!.businessName}
              link={`/businesses/${user.rpStats.job!.businessID}`}
            />
          )}
          {!user.rpStats.job && <p>No job</p>}
        </div>
        <div className="col-6 mb-4">
          <b>Gang Affiliation</b>
          {user.rpStats.gang && (
            <EmploymentBlock
              badge={`${config.swfBadgeURL}/${
                user.rpStats.gang!.gangBadge
              }.gif`}
              position={user.rpStats!.gang!.rankName}
              name={user.rpStats!.gang!.gangName}
              link={`/gangs/${user.rpStats.gang!.gangID}`}
            />
          )}
          {!user.rpStats.gang && <p>No gang</p>}
        </div>
      </Row>
    </Card>
  );
}
