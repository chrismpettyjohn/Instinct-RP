import React from 'react';
import {setURL} from '@instinct-web/core';
import {Row} from '../../components/generic/row/Row';
import {UserLayout} from '../../components/layout/user';
import {Card} from '../../components/generic/card/Card';
import {Container} from '../../components/generic/container/Container';
import {useFetchGovPositions} from '../../hooks/government/fetch-gov-positions';
import {MiniJumbotron} from '../../components/generic/mini-jumbotron/MiniJumbotron';
import {UserContainer} from '../../components/templates/user-container/UserContainer';
import {
  BusinessPosition,
  GovernmentBranch,
} from '@instinct-plugin/roleplay-types';

setURL('government/executive', <GovernmentExecutive />);

export function GovernmentExecutive() {
  const govPositions = useFetchGovPositions();

  function getPosition(position: BusinessPosition) {
    return (
      <Card header={position.name} style={{height: '100%'}}>
        {position.employees!.map(user => (
          <div key={user.id} className="mt-4">
            <UserContainer user={user} showGang={false} />
          </div>
        ))}
        {position.employees!.length === 0 && <p>This position is empty</p>}
      </Card>
    );
  }

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <Row>
                <div className="col-12">
                  <h1>Executive Office</h1>
                  <p>
                    The EOP, overseen by the White House Chief of Staff, has
                    traditionally been home to many of the President’s closest
                    advisers.
                  </p>
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {govPositions
            ?.filter(
              _ => _.governmentBranch === GovernmentBranch.ExecutiveOffice
            )
            ?.map(govPosition => (
              <div className="col-6 mb-2" key={`position_${govPosition.id}`}>
                {getPosition(govPosition)}
              </div>
            ))}
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <Row>
                <div className="col-12">
                  <h1>Executive Cabinet</h1>
                  <p>
                    The Cabinet is an advisory body made up of the heads of the
                    executive departments.
                  </p>
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {govPositions
            ?.filter(
              _ => _.governmentBranch === GovernmentBranch.ExecutiveCabinet
            )
            ?.map(govPosition => (
              <div className="col-6 mb-2" key={`position_${govPosition.id}`}>
                {getPosition(govPosition)}
              </div>
            ))}
        </Row>
      </Container>
    </UserLayout>
  );
}
