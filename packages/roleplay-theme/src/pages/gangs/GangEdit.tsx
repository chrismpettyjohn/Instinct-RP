import React from 'react';
import {Column, Icon, setURL} from '@instinct-web/core';
import {Row} from '../../components/generic/row/Row';
import {UserLayout} from '../../components/layout/user';
import {Card} from '../../components/generic/card/Card';
import {Jumbotron} from '../../components/generic/jumbotron/Jumbotron';
import {Container} from '../../components/generic/container/Container';
import {Link} from 'wouter';

setURL('gangs/edit/:gangID', <GangEdit />);

export function GangEdit() {
  return (
    <UserLayout section="community_team">
      <Jumbotron title="Gang Editor">
        <p>Gang</p>
      </Jumbotron>
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
