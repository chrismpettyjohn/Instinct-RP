import React, {useContext} from 'react';
import {Icon, configContext} from '@instinct-web/core';
import {Card} from '../../../components/generic/card/Card';
import {GangScoreCardProps} from './gang-score-card/GangScoreCard.types';

export function GangScoreCard({
  gangs,
  gangStat,
  gangStatLabel,
  header,
  headerIcon,
}: GangScoreCardProps) {
  const {config} = useContext(configContext);

  function getHeader() {
    return (
      <div className="row">
        <div className="col-6">
          <Icon type={headerIcon} />
        </div>
        <div className="col-6 text-right">{header}</div>
      </div>
    );
  }

  return (
    <Card header={getHeader()}>
      {gangs.map(gang => (
        <div className="top-gang-container" key={`top_gang_${gang.id}`}>
          <div className="row">
            <div className="col-4">
              <img
                src={`${config.swfBadgeURL}/${gang.badge}.gif`}
                onError={(event: any) => (event.target.style.display = 'none')}
              />
            </div>
            <div className="col-8 text-right">
              <h3>{gang.name}</h3>
              <h5 style={{marginTop: -10}}>
                <b>{gangStat(gang)}</b> {gangStatLabel}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
