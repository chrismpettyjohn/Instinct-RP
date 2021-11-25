import {Link} from 'wouter';
import React, {useContext} from 'react';
import {NavBar} from './navbar/NavBar';
import {configContext, healthContext, Icon} from '@instinct-web/core';

export function Header() {
  const {config} = useContext(configContext);
  const {health} = useContext(healthContext);
  return (
    <>
      <header
        id="header"
        className="header-container pixelated is-small is-logged"
      >
        <div className="header-content row">
          <div className="col-6 text-left">
            <Link to="/">
              <img className="header-logo" src={config.logoURL} />
            </Link>
          </div>
          <div className="col-6 text-right">
            <div id="account-buttons" className="account-buttons">
              <div
                className="rounded-button"
                style={{
                  background: '#001726',
                  border: 'none',
                  boxShadow: '2px 2px #0F416C',
                  color: 'white',
                }}
              >
                {health.usersOnline}
                <Icon className="ml-2" type="user" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <NavBar />
    </>
  );
}
