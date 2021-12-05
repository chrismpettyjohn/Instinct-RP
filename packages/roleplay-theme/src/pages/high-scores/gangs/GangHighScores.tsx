import React from 'react';
import {setURL} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
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
          <div className="col-4">Kills</div>
          <div className="col-4">Deaths</div>
          <div className="col-4">Damage</div>
        </Row>
      </Container>
    </UserLayout>
  );
}
