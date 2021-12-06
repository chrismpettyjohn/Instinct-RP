import React from 'react';
import {Link} from 'wouter';
import './UserContainer.scss';
import {Avatar} from '@instinct-web/core';
import {UserContainerProps} from './UserContainer.types';

export function UserContainer({
  user,
  showJob = true,
  showGang = true,
  showPolitics = true,
}: UserContainerProps) {
  return (
    <div className="member-container">
      <div className="member-content flex-container flex-vertical-center">
        <Link to={`/profile/${user.username}`}>
          <div
            className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
            style={{overflow: 'hidden'}}
          >
            <Avatar look={user.figure} />
          </div>
        </Link>
        <div className="member-details">
          <Link to={`/profile/${user.username}`} className="details-username">
            {user.username}
          </Link>
          <div className="details-motto">
            {showPolitics && (
              <p style={{margin: 0}}>
                Politics:{' '}
                {user.rpStats.politicalParty ? (
                  <Link
                    to={`/government/parties/view/${user.rpStats.politicalParty.id}`}
                  >
                    <b>{user.rpStats.politicalParty.name}</b>
                  </Link>
                ) : (
                  <b>N/A</b>
                )}
              </p>
            )}
            {showGang && (
              <p style={{margin: 0}}>
                Gang:&nbsp;
                {user.rpStats.gang ? (
                  <b>
                    {user.rpStats.gang.rankName} @{' '}
                    <Link to={`/gangs/view/${user.rpStats.gang.gangID}`}>
                      {user.rpStats.gang.gangName}
                    </Link>
                  </b>
                ) : (
                  <b>N/A</b>
                )}
              </p>
            )}
            {showJob && (
              <p style={{margin: 0}}>
                Employment:&nbsp;
                {user.rpStats.job ? (
                  <b>
                    {user.rpStats.job.positionName} @{' '}
                    <Link
                      to={`/businesses/view/${user.rpStats.job.businessID}`}
                    >
                      {user.rpStats.job.businessName}
                    </Link>
                  </b>
                ) : (
                  <b>N/A</b>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="member-status flex-container flex-vertical-center flex-horizontal-center">
          <span
            className={user.online ? 'status-icon online' : 'status-icon'}
            title={user.online ? 'Online' : 'Offline'}
          />
        </div>
      </div>
    </div>
  );
}
