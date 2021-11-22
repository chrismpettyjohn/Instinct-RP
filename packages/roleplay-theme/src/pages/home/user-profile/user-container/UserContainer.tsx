import Moment from 'moment';
import React from 'react';
import {UserProfileWidgetProps} from '../UserProfile.types';
import {Avatar, Icon} from '@instinct-web/core';
import {DetailsContainer} from './details-container';

export function UserContainer({profile}: UserProfileWidgetProps) {
  return (
    <aside id="profile" className="default-section">
      <div className="profile-header">
        <div
          className="header-content flex-container flex-vertical-center"
          style={{backgroundColor: '#47AEE'}}
        >
          <Avatar
            look={profile?.user?.figure ?? ''}
            direction={2}
            headDirection={2}
            size="l"
          />
          <div className="header-details">
            <div className="header-title">{profile?.user.username}</div>
            <div className="header-description" />
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="profile-content">
        <div className="details-container">
          <Icon type="hotel" />
          Currently&nbsp;
          {profile?.user?.online ? (
            <strong className="text-success">online</strong>
          ) : (
            <strong className="text-danger">offline</strong>
          )}
        </div>
        <DetailsContainer icon="user" header="Joined:">
          {Moment(profile?.user?.joinDate).format('MM/DD/YYYY')}
        </DetailsContainer>
        <DetailsContainer icon="door-open" header="Last Online:">
          {Moment(profile?.user?.lastLoginDate).format('MM/DD/YYYY')}
        </DetailsContainer>
      </div>
    </aside>
  );
}
