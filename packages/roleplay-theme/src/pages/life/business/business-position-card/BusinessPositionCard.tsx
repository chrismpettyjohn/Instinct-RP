import {Link} from 'wouter';
import React, {useContext, useState} from 'react';
import {configContext, Icon} from '@instinct-web/core';
import {Row} from '../../../../components/generic/row/Row';
import {Card} from '../../../../components/generic/card/Card';
import {BusinessPositionCardProps} from './BusinessPositionCard.types';

export function BusinessPositionCard({
  business,
  position,
}: BusinessPositionCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const [buttonColor, buttonIcon, buttonText] = !showConfirm
    ? ['success', 'check-circle', 'Accept Position']
    : ['warning', 'question-circle', 'Are You Sure?'];

  function acceptPosition() {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }
  }

  const {config} = useContext(configContext);
  return (
    <div>
      <Card className="business-card">
        <Row>
          <div className="col-6">
            <img
              style={{width: 100, height: 100}}
              src={`${config.swfBadgeURL}/${business.badge}.gif`}
              onError={(event: any) => (event.target.style.display = 'none')}
            />
          </div>
          <div className="col-6 text-right">
            <h2
              className="text-uppercase mb-0"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              {position.name}
            </h2>
            <h3>
              @
              <Link to={`/businesses/${business.id}`}>
                <b>{business.name}</b>
              </Link>
            </h3>
            <p>
              Pays <Icon className="text-success" type="dollar-sign" />
              {position.shiftWage.toLocaleString()} per shift
            </p>
            <p style={{marginTop: -10}}>
              Managed by:{' '}
              <Link to={`/profile/${business.owner.username}`}>
                <b>{business.owner.username}</b>
              </Link>
            </p>
            <button
              className={`btn btn-block btn-${buttonColor}`}
              onBlur={() => setShowConfirm(false)}
              onClick={acceptPosition}
            >
              <Icon type={buttonIcon} /> {buttonText}
            </button>
          </div>
        </Row>
      </Card>
    </div>
  );
}
