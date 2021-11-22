import React from 'react';
import {take} from 'lodash';
import Draggable from 'react-draggable';
import {GroupContainer} from './group-container';
import {UserProfileWidgetProps} from '../UserProfile.types';
import {Card} from '../../../../components/generic/card/Card';

export function Groups({profile}: UserProfileWidgetProps) {
  return (
    <Draggable>
      <Card header="Groups">
        <div className="items-container">
          {profile?.groups.length === 0 && (
            <p>{profile.user?.username} hasn't joined any groups</p>
          )}
          {take(profile?.groups, 5).map(group => (
            <div className="item-container" key={group.id}>
              <GroupContainer group={group} />
            </div>
          ))}
        </div>
      </Card>
    </Draggable>
  );
}
