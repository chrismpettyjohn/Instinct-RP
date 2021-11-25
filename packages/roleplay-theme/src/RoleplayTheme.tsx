import React, {useEffect, useState} from 'react';
import {WebSocketContextProvider} from './context/web-socket';
import {Bootstrap, ContextProviders} from '@instinct-web/core';
import {RPUserContextProvider} from './context/rp-user/RPUser.provider';

export function RoleplayTheme() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await import('./pages');
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return null;
  }

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
