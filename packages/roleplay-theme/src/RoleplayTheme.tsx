import React from 'react';
import {WebSocketContextProvider} from './context/web-socket';
import {Bootstrap, ContextProviders} from '@instinct-web/core';
import {RPUserContextProvider} from './context/rp-user/RPUser.provider';

export function RoleplayTheme() {
  return (
    <ContextProviders>
      <WebSocketContextProvider>
        <RPUserContextProvider>
          <Bootstrap />
        </RPUserContextProvider>
      </WebSocketContextProvider>
    </ContextProviders>
  );
}
