import {Link} from 'wouter';
import React, {useContext} from 'react';
import {NavBarChildLink} from '../../generic/navbar/navbar-child-link/NavBarChildLink';
import {Avatar, Icon, sessionContext} from '@instinct-web/core';

export function UserDropdown() {
  const {user} = useContext(sessionContext);

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <Link to={`/profile/${user.username}`} style={{paddingRight: 0}}>
        <div className="account-avatar">
          <Avatar
            look={`${user.figure}&amp;action=std&amp;gesture=std&amp;direction=2&amp;head_direction=2&amp;size=n`}
          />
        </div>
        <span>
          {user.username}
          <Icon className="ml-2" type="caret-down" />
        </span>
      </Link>
      <ul className="navigation-submenu">
        <NavBarChildLink to="/preferences">Settings</NavBarChildLink>
        <NavBarChildLink to={`/profile/${user.username}`}>
          My Profile
        </NavBarChildLink>
        <NavBarChildLink to="/vibe-of-the-week">Vibez</NavBarChildLink>
        <NavBarChildLink to="/logout">Logout</NavBarChildLink>
        {user.rank?.permissions.websiteShowAdminPanel && (
          <>
            <hr />
            <NavBarChildLink to="/admin">Manage Hotel</NavBarChildLink>
            <NavBarChildLink to="/rp-admin">Manage RP</NavBarChildLink>
          </>
        )}
      </ul>
    </>
  );
}
