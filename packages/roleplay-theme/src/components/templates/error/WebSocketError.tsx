import React, {useContext, useState} from 'react';
import {webSocketContext} from '../../../context/web-socket';
import {BaseError, configContext, Icon} from '@instinct-web/core';

export function WebSocketError() {
  const {config} = useContext(configContext);
  const {retry} = useContext(webSocketContext);
  const [spinner, setSpinner] = useState(false);

  if (!config.websocketEnabled) {
    return null;
  }

  function retryConnection() {
    setSpinner(true);
    retry();
    setTimeout(() => {
      setSpinner(false);
    }, 1500);
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        zIndex: 400,
      }}
    >
      <div style={{marginTop: '15%'}}>
        <BaseError header="Web Socket failed to connect">
          <p>We could not secure a connection to our web socket server.</p>
          <button
            className="btn btn-primary"
            disabled={spinner}
            onClick={retryConnection}
          >
            {spinner ? (
              <>
                <Icon className="fa-spin mr-2" type="spinner" />
                Retrying Connection
              </>
            ) : (
              <>
                <Icon type="retry" />
                Try Again
              </>
            )}
          </button>
        </BaseError>
      </div>
    </div>
  );
}
