import React, {useContext} from 'react';
import {UserDropdown} from './UserDropdown';
import {configContext, sessionContext} from '@instinct-web/core';
import {
  NavBarLink,
  NavBarDropdown,
  NavBarChildLink,
} from '../../generic/navbar';

export function NavBar() {
  const {config} = useContext(configContext);
  const {user} = useContext(sessionContext);

  return (
    <nav className="navigation-container">
      <ul
        className="navigation-menu flex-container"
        style={{width: '100%', maxWidth: 1055, margin: '0 auto'}}
      >
        {!!user && (
          <>
            <NavBarLink to="/me">Home</NavBarLink>
            <NavBarDropdown text="Community" to="/community/news">
              <NavBarChildLink to="/community/news">News</NavBarChildLink>
              <NavBarChildLink to="/community/staff">Staff</NavBarChildLink>
              <NavBarChildLink to="/guides">Guides</NavBarChildLink>
              <NavBarChildLink to="/community/photos">Photos</NavBarChildLink>
              <NavBarChildLink to="/community/online">
                Online Users
              </NavBarChildLink>
            </NavBarDropdown>
            <NavBarDropdown text="Government" to="/government/executive">
              <NavBarChildLink to="/government/executive">
                Executive Cabinet
              </NavBarChildLink>
              <NavBarChildLink to="/government/assembly">
                National Assembly
              </NavBarChildLink>
              <NavBarChildLink to="/government/laws">
                Laws of {config.siteName}
              </NavBarChildLink>
              <NavBarChildLink to="/government/parties">
                Political Parties
              </NavBarChildLink>
            </NavBarDropdown>
            <NavBarDropdown text="Crime" to="/crimes">
              <NavBarChildLink to="/crimes">Crimes</NavBarChildLink>
              <NavBarChildLink to="/crimes/bounties">Bounties</NavBarChildLink>
            </NavBarDropdown>
            <NavBarLink to="/businesses">Business</NavBarLink>
            <NavBarLink to="/gangs">Gangs</NavBarLink>
            <li className="navigation-item navigation-right-side-item has-items">
              <UserDropdown />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
