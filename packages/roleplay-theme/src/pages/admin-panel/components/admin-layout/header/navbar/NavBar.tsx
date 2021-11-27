import React, {useContext} from 'react';
import {NavBarLink} from './navbar-link/NavBarLink';
import {UserDropdown} from './user-dropdown/UserDropdown';
import {sessionContext, PermissionGuard} from '@instinct-web/core';
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
        <NavBarLink to="/rp-admin/game/food">Game</NavBarLink>
        <RPPermissionGuard permission="websiteManageCrimes" redirect={false}>
          <NavBarLink to="/rp-admin/crimes">Crimes</NavBarLink>
        </RPPermissionGuard>
        <RPPermissionGuard permission="websiteManageRooms" redirect={false}>
          <NavBarLink to="/rp-admin/rooms">Rooms</NavBarLink>
        </RPPermissionGuard>
        <PermissionGuard permission="websiteManageUsers" redirect={false}>
          <NavBarLink to="/rp-admin/users">Users</NavBarLink>
        </PermissionGuard>
        <li className="navigation-item navigation-right-side-item has-items">
          <UserDropdown />
        </li>
      </ul>
    </nav>
  );
}
