import {
  WebSocketIncomingEvent,
  WebSocketOutgoingEvent,
  WebSocketOutgoingEvents,
} from '@instinct-plugin/roleplay-types';
import {WebSocketSubscriber} from '../../services/web-socket';

export interface WebSocketContext {
  onEvent<K extends WebSocketIncomingEvent>(
    event: K,
    callback: WebSocketSubscriber<K>
  ): void;
  sendEvent<K extends WebSocketOutgoingEvent>(
    event: K,
    data: WebSocketOutgoingEvents[K]
  ): void;
  getConnectionStatus(): boolean;
  retry(): void;
}

export const defaultWebSocketContext: WebSocketContext = {
  onEvent<K extends WebSocketIncomingEvent>(
    event: K,
    callback: WebSocketSubscriber<K>
  ) {},
  sendEvent(event: string, data: object) {},
  getConnectionStatus(): boolean {
    return false;
  },
  retry() {},
};
