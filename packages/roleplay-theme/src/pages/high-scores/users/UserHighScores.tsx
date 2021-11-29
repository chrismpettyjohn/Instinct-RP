import React from 'react';
import {setURL} from '@instinct-web/core';
import {MostKillsCard} from './widgets/MostKills';
import {MostDeathsCard} from './widgets/MostDeaths';
import {MostDamageCard} from './widgets/MostDamage';
import {MostActiveCard} from './widgets/MostActive';
import {MostArrestsCard} from './widgets/MostArrests';
import {Row} from '../../../components/generic/row/Row';
import {MostJailTimeCard} from './widgets/MostJailTime';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('high-scores/users', <UserHighScores />);

export function UserHighScores() {
  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Top Users</h1>
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
