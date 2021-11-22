import React from 'react';
import {setURL} from '@instinct-web/core';
import {Row} from '../../components/generic/row/Row';
import {UserLayout} from '../../components/layout/user';
import {Container} from '../../components/generic/container/Container';
import {MiniJumbotron} from '../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('government/elections', <GovernmentElections />);

export function GovernmentElections() {
  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Election Parties</h1>
              <p>reeeeee?</p>
            </MiniJumbotron>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
