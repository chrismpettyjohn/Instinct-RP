// @ts-ignore - Dependency doesn't have a good @types
import Flash from 'swfobject';
import React, {useContext, useEffect} from 'react';
import {ClientWidgets} from '../../../widgets/ClientWidgets';
import {webSocketContext} from '@instinct-plugin/roleplay-web';
import {WebSocketError} from '../../../components/templates/error/WebSocketError';
import {
  configContext,
  sessionContext,
  setURL,
  themeContext,
} from '@instinct-web/core';

setURL('play', <PlayPage />);

export function PlayPage() {
  const {config} = useContext(configContext);
  const {online} = useContext(sessionContext);
  const {setStore} = useContext(themeContext);
  const {getConnectionStatus} = useContext(webSocketContext);
  const flashEnabled: boolean = Flash.getFlashPlayerVersion().major > 0;
  const webStatusOK: boolean =
    !config.websocketEnabled || getConnectionStatus();

  useEffect(() => {
    setStore({showClient: true});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!webStatusOK && flashEnabled && online) {
    return <WebSocketError />;
  }

  return <ClientWidgets />;
}
