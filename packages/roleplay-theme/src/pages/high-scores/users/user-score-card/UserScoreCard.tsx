import React from 'react';
import {Link} from 'wouter';
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
        <Link key={`top_user_${user.id}`} to={`/profile/${user.username}`}>
          <div className="top-user-container" style={{cursor: 'pointer'}}>
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
        </Link>
      ))}
    </Card>
  );
}
