import React from 'react';
import {take} from 'lodash';
import {Avatar} from '@instinct-web/core';
import {UserProfileWidgetProps} from '../UserProfile.types';
import {Card} from '../../../../components/generic/card/Card';
import {UserModal} from '../../../../components/templates/user-modal/UserModal';

export function Friends({profile}: UserProfileWidgetProps) {
  return (
    <Card header="Friends">
      <div className="items-container">
        {profile?.friends.length === 0 && (
          <p>{profile.user?.username} hasn't added any friends</p>
        )}
        {take(profile?.friends, 5).map(user => (
          <div className="item-container" key={user.id}>
            <UserModal user={user as any}>
              <Avatar look={user.figure} headOnly />
            </UserModal>
          </div>
        ))}
      </div>
    </Card>
  );
}
