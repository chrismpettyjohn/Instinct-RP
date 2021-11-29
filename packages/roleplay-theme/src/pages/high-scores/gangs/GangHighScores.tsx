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
          <div className="col-4">
            <h3 className="text-white text-uppercase">
              <Icon type="skull-crossbones" /> Kills
            </h3>
            <Card className="mb-2 mt-0">Hello</Card>
          </div>
          <div className="col-4">
            <h3 className="text-white text-uppercase">
              <Icon type="tombstone-alt" /> Deaths
            </h3>
            <Card className="mb-2 mt-0">Hello</Card>
          </div>
          <div className="col-4">
            <h3 className="text-white text-uppercase">
              <Icon type="user" /> Turfs
            </h3>
            <Card className="mb-2 mt-0">Hello</Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
