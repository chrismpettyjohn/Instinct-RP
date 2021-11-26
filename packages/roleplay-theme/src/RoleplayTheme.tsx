import React from 'react';
import {WebSocketContextProvider} from '@instinct-plugin/roleplay-web';
import {Bootstrap, ContextProviders} from '@instinct-web/core';
import {RPUserContextProvider} from '@instinct-plugin/roleplay-web';

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
