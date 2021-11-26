import {createContext} from 'react';
import {defaultWebSocketContext, WebSocketContext} from './WebSocket.types';

export const webSocketContext = createContext<WebSocketContext>(
  defaultWebSocketContext
);
