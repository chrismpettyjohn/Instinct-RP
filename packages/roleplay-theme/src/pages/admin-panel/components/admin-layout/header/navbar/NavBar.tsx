import React, {useContext} from 'react';
import {NavBarLink} from './navbar-link/NavBarLink';
import {sessionContext} from '@instinct-web/core';
import {UserDropdown} from './user-dropdown/UserDropdown';
import {RPPermissionGuard} from '../../../../../../components/templates/permission-guard';

export function NavBar() {
  const {user} = useContext(sessionContext);

  if (!user) {
    return null;
  }

  return (
    <nav className="navigation-container">
      <ul
        className="navigation-menu flex-container"
        style={{width: '100%', maxWidth: 1055, margin: '0 auto'}}
      >
        <NavBarLink to="/me">Back to Site</NavBarLink>
        <NavBarLink to="/rp-admin">Dashboard</NavBarLink>
        <RPPermissionGuard permission="websiteManageRP" redirect={false}>
          <NavBarLink to="/rp-admin/game/food">Game</NavBarLink>
          <NavBarLink to="/rp-admin/crimes">Crimes</NavBarLink>
          <NavBarLink to="/rp-admin/rooms">Rooms</NavBarLink>
          <NavBarLink to="/rp-admin/users">Users</NavBarLink>
        </RPPermissionGuard>
        <li className="navigation-item navigation-right-side-item has-items">
          <UserDropdown />
        </li>
      </ul>
    </nav>
  );
}
