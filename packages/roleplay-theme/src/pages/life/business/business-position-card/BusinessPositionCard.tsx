import {toast} from 'react-toastify';
import {Link, useLocation} from 'wouter';
import React, {useContext, useState} from 'react';
import {configContext, Icon} from '@instinct-web/core';
import {Row} from '../../../../components/generic/row/Row';
import {Card} from '../../../../components/generic/card/Card';
import {businessService} from '@instinct-plugin/roleplay-web';
import {BusinessPositionCardProps} from './BusinessPositionCard.types';

export function BusinessPositionCard({
  business,
  position,
}: BusinessPositionCardProps) {
  const [location, setLocation] = useLocation();
  const [showSpinner, setSpinner] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [buttonColor, buttonIcon, buttonText] = showSpinner
    ? ['success', 'spin fa-spin', 'Accepting Position...']
    : !showConfirm
    ? ['success', 'check-circle', 'Accept Position']
    : ['warning', 'question-circle', 'Are You Sure?'];

  async function acceptPosition() {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    try {
      setSpinner(true);
      await businessService.acceptOpenPosition(position.id.toString());
      toast.success(`You are now a ${position.name} at ${business.name}!`);
      setLocation(`/businesses/${business.id}`);
    } catch {
      toast.error(`There was a problem accepting the job: ${position.name}`);
    } finally {
      setSpinner(false);
      setShowConfirm(false);
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
          {showConfirm && (
            <div className="col-12 mt-2">
              <b className="text-warning mr-2">
                <Icon type="exclamation-triangle" /> Heads up!
              </b>
              <p>
                By accepting this position, you will resign from your current
                role
              </p>
            </div>
          )}
        </Row>
      </Card>
    </div>
  );
}
