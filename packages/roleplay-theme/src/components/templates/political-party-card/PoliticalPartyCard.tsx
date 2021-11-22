import {Link} from 'wouter';
import React, {useContext} from 'react';
import {Row} from '../../generic/row/Row';
import {capitalize} from '@material-ui/core';
import {Card} from '../../generic/card/Card';
import {Avatar, configContext} from '@instinct-web/core';
import {PoliticalPartyCardProps} from './PoliticalPartyCard.types';

export function PoliticalPartyCard({politicalParty}: PoliticalPartyCardProps) {
  const {config} = useContext(configContext);
  return (
    <Link to={`/government/parties/view/${politicalParty.id}`}>
      <div>
        <Card className="business-card">
          <Row>
            <div className="col-6">
              <div className="avatar">
                <Avatar
                  look={politicalParty.founder.figure}
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
                {politicalParty.name}
              </h2>
              <p style={{marginTop: -10}}>
                Founded by: <b>{politicalParty.founder.username}</b>
              </p>
              <p style={{marginTop: -10}}>
                Political Beliefs: <b>{capitalize(politicalParty.ideology)}</b>
              </p>
              <img
                src={`${config.swfBadgeURL}/${politicalParty.badge}.gif`}
                onError={(event: any) => (event.target.style.display = 'none')}
              />
            </div>
          </Row>
        </Card>
      </div>
    </Link>
  );
}
