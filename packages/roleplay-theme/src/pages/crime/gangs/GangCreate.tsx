import React from 'react';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {Column, Icon, setURL} from '@instinct-web/core';
import {Link} from 'wouter';

setURL('gangs/creator', <GangCreate />);

export function GangCreate() {
  return (
    <UserLayout section="community_team">
      <Container>
        <Row>
          <div className="col-12">
            <Link to="/gangs">
              <Icon
                className="fa-4x text-white"
                style={{cursor: 'pointer'}}
                type="caret-left"
              />
            </Link>
          </div>
        </Row>
        <Row>
          <MiniJumbotron>
            <h2>Gang Creator</h2>
            <p>Kickstart your criminal empire today</p>
          </MiniJumbotron>
        </Row>
        <Row>
          <Column side="left">
            <Card>
              <p>Coming soon</p>
            </Card>
          </Column>
        </Row>
      </Container>
    </UserLayout>
  );
}
