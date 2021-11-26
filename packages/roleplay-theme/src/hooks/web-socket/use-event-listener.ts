import {useContext, useEffect} from 'react';
import {webSocketContext} from '../../context/web-socket';
import {WebSocketSubscriber} from '@instinct-plugin/roleplay-web';
import {configContext, sessionContext} from '@instinct-web/core';
import {
  WebSocketIncomingEvent,
  WebSocketIncomingEvents,
} from '@instinct-plugin/roleplay-types';

export function useWebSocketEventListener<K extends WebSocketIncomingEvent>(
  incomingEvent: K,
  callback: WebSocketSubscriber<WebSocketIncomingEvents[K]>
) {
  const {config} = useContext(configContext);
  const {online} = useContext(sessionContext);
  const {onEvent} = useContext(webSocketContext);

  useEffect(() => {
    function registerEventListener() {
      onEvent(incomingEvent, callback);
    }

    if (online && config.websocketEnabled) {
      registerEventListener();
    }
  }, [online, config.websocketEnabled]);

  return null;
}
