import {rpUserContext} from './RPUser';
import {RPUser} from '@instinct-plugin/roleplay-types';
import {rpSessionService} from '@instinct-plugin/roleplay-web';
import React, {useContext, useEffect, useState} from 'react';
import {ContextProvidersProps, sessionContext} from '@instinct-web/core';

export function RPUserContextProvider({children}: ContextProvidersProps) {
  const {user} = useContext(sessionContext);
  const [rpUser, setRPUser] = useState<RPUser | undefined>(undefined);

  useEffect(() => {
    if (user?.id === undefined) {
      setRPUser(undefined);
      return;
    }

    async function fetchLatestRPUser() {
      const response = await rpSessionService.getRPUser();
      setRPUser(response);
    }

    fetchLatestRPUser();
  }, [user?.id]);

  function updateRPUser(changes?: Partial<RPUser>): void {
    setRPUser(_ => {
      if (!changes) return undefined;
      return {
        ..._,
        ...changes,
      } as any;
    });
  }

  return (
    <rpUserContext.Provider value={{rpUser: rpUser, setRPUser: updateRPUser}}>
      {children}
    </rpUserContext.Provider>
  );
}
