import React from 'react';
import {setURL} from '@instinct-web/core';
import {MostKillsCard} from '../users/widgets/MostKills';
import {MostDeathsCard} from '../users/widgets/MostDeaths';
import {MostDamageCard} from '../users/widgets/MostDamage';
import {MostActiveCard} from '../users/widgets/MostActive';
import {MostArrestsCard} from '../users/widgets/MostArrests';
import {Row} from '../../../components/generic/row/Row';
import {MostJailTimeCard} from '../users/widgets/MostJailTime';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {NotAddedNotice} from '../../../components/templates/not-added-notice/NotAddedNotice';

setURL('high-scores/gangs', <GangHighScores />);

export function GangHighScores() {
  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <NotAddedNotice />
          </div>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Top Gangs</h1>
              <p>Can you make it to the top?</p>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-4">
            <MostKillsCard />
          </div>
          <div className="col-4">
            <MostDeathsCard />
          </div>
          <div className="col-4">
            <MostDamageCard />
          </div>
        </Row>
        <br />
        <Row>
          <div className="col-4">
            <MostArrestsCard />
          </div>
          <div className="col-4">
            <MostJailTimeCard />
          </div>
          <div className="col-4">
            <MostActiveCard />
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
