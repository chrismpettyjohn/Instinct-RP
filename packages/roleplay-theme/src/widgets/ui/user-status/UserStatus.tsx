import './UserStatus.scss';
import {useFetchRPStats} from '../../../hooks/session';
import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Icon, sessionContext} from '@instinct-web/core';
import {useWebSocketEventListener} from '../../../hooks/web-socket';
import {WebSocketIncomingUpdateProgressBarsEvent} from '@instinct-plugin/roleplay-types';

export function UserStatusWidget() {
  const rpStats = useFetchRPStats();
  const {user, online} = useContext(sessionContext);
  const [status, setStatus] =
    useState<WebSocketIncomingUpdateProgressBarsEvent>();
  useWebSocketEventListener('update_progress_bars', onStatusChange);

  useEffect(() => {
    if (rpStats) {
      setStatus({
        health: rpStats.health.current,
        health_max: rpStats.health.maximum,
        energy: rpStats.energy.current,
        energy_max: rpStats.energy.maximum,
      });
    }
  }, [rpStats]);

  if (!status || !user || !online) {
    return null;
  }

  const healthPercent = (status.health / status.health_max) * 100;
  const energyPercent = (status.energy / status.energy_max) * 100;

  function onStatusChange(newStatus: WebSocketIncomingUpdateProgressBarsEvent) {
    setStatus(newStatus);
  }

  return (
    <div className="user-status-widget">
      <div className="row">
        <div className="col-3">
          <div className="user-avatar">
            <Avatar look={user.figure} />
          </div>
        </div>
        <div className="col-9" style={{marginTop: 5}}>
          <div
            className="progress"
            style={{
              background: '#f44336',
              height: 25,
              width: 200,
              position: 'relative',
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{background: '#d50000', width: `${healthPercent}%`}}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <h6
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                textAlign: 'center',
                paddingTop: 5,
              }}
            >
              <Icon type="heart" />
              {status?.health} / {status?.health_max}
            </h6>
          </div>
          <div
            className="progress"
            style={{
              background: '#01579B',
              height: 15,
              width: 200,
              position: 'relative',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginTop: -5,
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{background: '#0277BD', width: `${energyPercent}%`}}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
