import React, {useContext} from 'react';
import {Link} from 'wouter';
import './BusinessCard.scss';
import {Row} from '../../generic/row/Row';
import {Avatar, configContext} from '@instinct-web/core';
import {Card} from '../../generic/card/Card';
import {BusinessCardProps} from './BusinessCard.types';

export function BusinessCard({business}: BusinessCardProps) {
  const {config} = useContext(configContext);
  return (
    <Link to={`/businesses/${business.id}`}>
      <div>
        <Card className="business-card">
          <Row>
            <div className="col-6">
              <div className="avatar">
                <Avatar
                  look={business.owner.figure}
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
                {business.name}
              </h2>
              <p style={{marginTop: -10}}>
                Managed by: <b>{business.owner.username}</b>
              </p>
              <img
                src={`${config.swfBadgeURL}/${business.badge}.gif`}
                onError={(event: any) => (event.target.style.display = 'none')}
              />
            </div>
          </Row>
        </Card>
      </div>
    </Link>
  );
}
