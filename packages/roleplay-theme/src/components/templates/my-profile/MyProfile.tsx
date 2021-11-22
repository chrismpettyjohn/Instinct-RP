import './MyProfile.scss';
import {Link} from 'wouter';
import React, {useContext} from 'react';
import {Avatar, sessionContext} from '@instinct-web/core';

export function MyProfile() {
  const {user} = useContext(sessionContext);
  return (
    <article className="default-section profile-section">
      <div className="background-image">
        <Link
          className="rounded-button white plain hotel-button enter-hotel"
          to="/play"
        >
          Enter Hotel
        </Link>
      </div>
      <div className="profile-content">
        <div className="header-image">
          <Avatar className="figure" look={user!.figure} />
        </div>
        <div className="stats" style={{height: 30, width: '100%'}}>
          "{user!.motto}"
        </div>
      </div>
    </article>
  );
}
