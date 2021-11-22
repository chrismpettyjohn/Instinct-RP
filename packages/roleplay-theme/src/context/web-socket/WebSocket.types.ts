import {
  WebSocketIncomingEvent,
  WebSocketIncomingEvents,
  WebSocketOutgoingEvent,
  WebSocketOutgoingEvents,
} from '@instinct-plugin/roleplay-types';

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

export type WebSocketSubscriber<K extends WebSocketIncomingEvent> = (
  payload: WebSocketIncomingEvents[K]
) => void | Promise<void>;
