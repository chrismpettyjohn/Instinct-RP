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
            <NavBarDropdown text="High Scores" to="/high-scores/users">
              <NavBarChildLink to="/high-scores/users">Users</NavBarChildLink>
              <NavBarChildLink to="/high-scores/gangs">Gangs</NavBarChildLink>
              <NavBarChildLink to="/high-scores/jobs">Jobs</NavBarChildLink>
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
              <NavBarChildLink to="/gangs">Gangs</NavBarChildLink>
            </NavBarDropdown>
            <NavBarDropdown text="Life" to="/businesses/jobs">
              <NavBarChildLink to="/businesses/jobs">
                Job Market
              </NavBarChildLink>
              <NavBarChildLink to="/businesses">Businesses</NavBarChildLink>
              <NavBarChildLink to="/properties">Real Estate</NavBarChildLink>
            </NavBarDropdown>
            <li className="navigation-item navigation-right-side-item has-items">
              <UserDropdown />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
