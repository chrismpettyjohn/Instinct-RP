import React from 'react';
import {Avatar, Icon} from '@instinct-web/core';
import {UserScoreCardProps} from './UserScoreCard.types';
import {Card} from '../../../../components/generic/card/Card';

export function UserScoreCard({
  users,
  userStat,
  userStatLabel,
  header,
  headerIcon,
}: UserScoreCardProps) {
  function getHeader() {
    return (
      <div className="row">
        <div className="col-6">
          <Icon type={headerIcon} />
        </div>
        <div className="col-6 text-right">{header}</div>
      </div>
    );
  }

  return (
    <Card header={getHeader()}>
      {users.map(user => (
        <div className="top-user-container" key={`top_user_${user.id}`}>
          <div className="row">
            <div className="col-4">
              <Avatar look={user.figure} headOnly />
            </div>
            <div className="col-8 text-right">
              <h3>{user.username}</h3>
              <h5 style={{marginTop: -10}}>
                <b>{userStat(user)}</b> {userStatLabel}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
