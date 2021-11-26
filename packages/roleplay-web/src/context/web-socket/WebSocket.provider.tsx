import {webSocketContext} from './WebSocket';
import React, {useContext, useEffect, useState} from 'react';
import {WebSocketService, WebSocketSubscriber} from '../../services/web-socket';
import {
  configContext,
  ContextProvidersProps,
  sessionContext,
} from '@instinct-web/core';
import {
  WebSocketIncomingEvent,
  WebSocketIncomingEvents,
  WebSocketOutgoingEvent,
  WebSocketOutgoingEvents,
} from '@instinct-plugin/roleplay-types';

export function WebSocketContextProvider({children}: ContextProvidersProps) {
  const {sso} = useContext(sessionContext);
  const {config} = useContext(configContext);
  const [connection, setConnection] = useState<WebSocketService>();

  useEffect(() => {
    if (sso && config.websocketEnabled) {
      setConnection(
        new WebSocketService(config.websocketIP, config.websocketPort, sso)
      );
    }
  }, [sso]);

  function onEvent<K extends WebSocketIncomingEvent>(
    event: K,
    callback: WebSocketSubscriber<WebSocketIncomingEvents[K]>
  ) {
    if (config.websocketEnabled) {
      connection!.addSubscriber(event, callback);
    }
  }

  function sendEvent<K extends WebSocketOutgoingEvent>(
    event: K,
    data: WebSocketOutgoingEvents[K]
  ) {
    if (!config.websocketEnabled) {
      return;
    }
    if (!connection) {
      throw new Error('Web Socket connection has not been started');
    }
    connection.sendEvent(event, data);
  }

  function retry() {
    if (!config.websocketEnabled) {
      return;
    }
    if (connection) {
      connection.retry();
      return;
    }

    if (sso) {
      setConnection(
        new WebSocketService(config.websocketIP, config.websocketPort, sso!)
      );
    }
  }

  function getConnectionStatus() {
    if (!config.websocketEnabled) {
      return false;
    }
    return connection?.getConnectionStatus() === true;
  }

  return (
    <webSocketContext.Provider
      value={{onEvent, sendEvent, getConnectionStatus, retry}}
    >
      {children}
    </webSocketContext.Provider>
  );
}
