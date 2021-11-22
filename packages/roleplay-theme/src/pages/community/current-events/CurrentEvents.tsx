import React, {useContext} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {Column, setURL, configContext} from '@instinct-web/core';

setURL('community/current-events', <CurrentEvents />);

export function CurrentEvents() {
  const {config} = useContext(configContext);

  return (
    <UserLayout>
      <Container>
        <Row>
          <MiniJumbotron>
            <h2>{config.siteName} - Current Event</h2>
            <p>Check out what users have to say</p>
          </MiniJumbotron>
        </Row>
        <Row>
          <Column side="left">
            <Card>
              <p>We don't have any rules. Anarchy!</p>
            </Card>
          </Column>
        </Row>
      </Container>
    </UserLayout>
  );
}
