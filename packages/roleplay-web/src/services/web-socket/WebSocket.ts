import WebSocketRetry from 'reconnecting-websocket';
import {WebSocketServiceBase, WebSocketSubscriber} from './WebSocket.types';
import {
  WebSocketIncomingEvent,
  WebSocketIncomingEvents,
  WebSocketOutgoingEvent,
  WebSocketOutgoingEvents,
} from '@instinct-plugin/roleplay-types';

export class WebSocketService implements WebSocketServiceBase {
  readonly connection: WebSocketRetry;

  subscribers: Record<string, WebSocketSubscriber<any>[]> = {};

  constructor(ip: string, port: string, readonly sso: string) {
    this.connection = new WebSocketRetry(`${ip}:${port}`);
    this.connection.onopen = this.onConnectionStarted;
    this.connection.onmessage = this.onMessage;
  }

  onConnectionStarted = () => {
    this.sendEvent('auth_with_sso', {
      sso_ticket: this.sso,
    });
  };

  onConnectionClosed = (event: CloseEvent) => {
    console.log('WS: Connection Closed ', event);
  };

  onMessage = (event: MessageEvent) => {
    const {event_name, event_data} = JSON.parse(event.data);
    const subscribers = this.subscribers[event_name] ?? [];

    console.log(event_name, event_data);

    for (const subscriber of subscribers) {
      subscriber(event_data);
    }
  };

  addSubscriber = <K extends WebSocketIncomingEvent>(
    event: K,
    callback: WebSocketSubscriber<WebSocketIncomingEvents[K]>
  ) => {
    if (this.subscribers[event]) {
      this.subscribers[event].push(callback);
    } else {
      this.subscribers[event] = [callback];
    }
  };

  sendEvent = <K extends WebSocketOutgoingEvent>(
    event: K,
    payload: WebSocketOutgoingEvents[K]
  ) => {
    this.connection.send(
      JSON.stringify({
        event_name: event,
        event_data: payload,
      })
    );
  };

  getConnectionStatus = (): boolean => {
    return this.connection.readyState === this.connection.OPEN;
  };

  retry = () => {
    this.connection.reconnect();
  };
}
