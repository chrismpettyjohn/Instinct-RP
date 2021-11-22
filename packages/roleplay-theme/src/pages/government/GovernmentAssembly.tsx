import React from 'react';
import {setURL} from '@instinct-web/core';
import {Row} from '../../components/generic/row/Row';
import {Card} from '../../components/generic/card/Card';
import {UserLayout} from '../../components/layout/user';
import {Container} from '../../components/generic/container/Container';
import {useFetchGovPositions} from '../../hooks/government/fetch-gov-positions';
import {MiniJumbotron} from '../../components/generic/mini-jumbotron/MiniJumbotron';
import {UserContainer} from '../../components/templates/user-container/UserContainer';
import {
  BusinessPosition,
  GovernmentBranch,
} from '@instinct-plugin/roleplay-types';

setURL('government/assembly', <GovernmentAssembly />);

export function GovernmentAssembly() {
  const govPositions = useFetchGovPositions();

  const nationalAssemblyMembers = govPositions
    ?.filter(_ => _.governmentBranch === GovernmentBranch.NationalAssembly)
    ?.map(_ => _.employees)
    ?.flat();

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
                  <h1>House Speakers</h1>
                  <p>
                    The Speaker is the political and parliamentary leader of the
                    House of Representatives
                  </p>
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {govPositions
            ?.filter(
              _ =>
                _.governmentBranch === GovernmentBranch.NationalAssemblySpeaker
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
                  <h1>Leadership</h1>
                  <p>
                    The majority party members and the minority party members
                    meet separately to select their leaders.
                  </p>
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {govPositions
            ?.filter(
              _ =>
                _.governmentBranch ===
                GovernmentBranch.NationalAssemblyLeadership
            )
            ?.map(govPosition => (
              <div className="col-6 mb-2" key={`position_${govPosition.id}`}>
                {getPosition(govPosition)}
              </div>
            ))}
        </Row>
        <Row>
          <div className="col-12 mt-4">
            <MiniJumbotron>
              <Row>
                <div className="col-12">
                  <h1>Representatives</h1>
                  <p>
                    Each representative is elected to a six-month term serving
                    the people of a specific congressional district.
                  </p>
                </div>
              </Row>
              <hr />
              <Row>
                {nationalAssemblyMembers?.map(user => (
                  <div key={user.id} className="col-6 mt-4">
                    <UserContainer user={user} />
                  </div>
                ))}
                {(nationalAssemblyMembers?.length ?? 0) === 0 && (
                  <div className="col-12">
                    <p>This position is empty</p>
                  </div>
                )}
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
