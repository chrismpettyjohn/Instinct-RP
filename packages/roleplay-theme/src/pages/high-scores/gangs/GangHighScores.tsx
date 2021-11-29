import React from 'react';
import {setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('high-scores/gangs', <GangHighScores />);

export function GangHighScores() {
  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>
                <Icon type="trophy" />
                High Score - Gangs
              </h1>
              <p>Check out some of these hot deals on the market</p>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card>Hello</Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
