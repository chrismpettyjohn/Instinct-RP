import {Link} from 'wouter';
import React, {useContext} from 'react';
import {HeaderProps} from './Header.types';
import {configContext} from '@instinct-web/core';

export function Header({children}: HeaderProps) {
  const {config} = useContext(configContext);
  return (
    <header
      id="header"
      className="header-container pixelated is-small is-logged"
    >
      <div className="header-content row">
        <div className="col-6 text-left">
          <Link to="/">
            <img className="header-logo" src={config.logoURL} height={75} />
          </Link>
        </div>
        <div className="col-6 text-right">
          <div id="account-buttons" className="account-buttons">
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
