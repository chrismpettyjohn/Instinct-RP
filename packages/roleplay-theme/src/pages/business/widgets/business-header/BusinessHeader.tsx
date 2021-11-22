import React, {useContext} from 'react';
import {Business} from '@instinct-plugin/roleplay-types';
import {configContext, Skeleton} from '@instinct-web/core';
import {MiniJumbotron} from '../../../../components/generic/mini-jumbotron/MiniJumbotron';

export function BusinessHeader({business}: {business?: Business}) {
  const {config} = useContext(configContext);
  return (
    <MiniJumbotron>
      <div className="row">
        <div className="col-8">
          <h1>{business?.name ?? <Skeleton width={200} />}</h1>
          <p>{business?.desc ?? <Skeleton width={200} />}</p>
        </div>
        <div className="col-4 text-right">
          {business?.badge ? (
            <img
              src={`${config.swfBadgeURL}/${business.badge}.gif`}
              style={{marginTop: 10, height: 80}}
            />
          ) : (
            <Skeleton circle width={80} height={80} />
          )}
        </div>
      </div>
    </MiniJumbotron>
  );
}
