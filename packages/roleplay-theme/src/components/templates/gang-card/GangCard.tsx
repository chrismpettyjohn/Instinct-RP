import React, {useContext} from 'react';
import {sum} from 'lodash';
import {Link} from 'wouter';
import {Row} from '../../generic/row/Row';
import {Avatar, configContext} from '@instinct-web/core';
import {Card} from '../../generic/card/Card';
import {GangCardProps} from './GangCard.types';

export function GangCard({gang}: GangCardProps) {
  const {config} = useContext(configContext);
  return (
    <Link to={`/gangs/view/${gang.id}`}>
      <div>
        <Card className="business-card">
          <Row>
            <div className="col-6">
              <div className="avatar">
                <Avatar
                  look={gang.owner.figure}
                  direction={2}
                  gesture="sml"
                  size="l"
                />
              </div>
            </div>
            <div className="col-6 text-right">
              <h2
                className="text-uppercase"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                {gang.name}
              </h2>
              <p style={{marginTop: -10}}>
                {sum(gang.ranks.map(_ => _.users.length)) + 1} Members
              </p>
              <img
                src={`${config.swfBadgeURL}/${gang.badge}.gif`}
                onError={(event: any) => (event.target.style.display = 'none')}
              />
            </div>
          </Row>
        </Card>
      </div>
    </Link>
  );
}
