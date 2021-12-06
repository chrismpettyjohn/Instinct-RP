import React, {useContext} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {useFetchRPStaff} from '@instinct-plugin/roleplay-web';
import {setURL, Skeleton, Icon, configContext} from '@instinct-web/core';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {UserContainer} from '../../../components/templates/user-container/UserContainer';

setURL('community/staff', <Staff />);

export function Staff() {
  const staff = useFetchRPStaff();
  const {config} = useContext(configContext);

  return (
    <UserLayout section="community_team">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <div className="row">
                <div className="col-8">
                  <h1>
                    <Icon type="clipboard-user" />
                    Staff Team
                  </h1>
                  <p>
                    Our staff team works day and night to keep our users safe{' '}
                    <br />
                    and our hotel secure.
                  </p>
                </div>
                <div className="col-4 text-right">
                  <img
                    src="https://www.habborator.org/badges/badges/ADM.gif"
                    style={{marginTop: 10, height: 80}}
                  />
                </div>
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {staff !== undefined ? (
            staff!.map(rank => (
              <div className="col-6" key={rank.id} style={{marginBottom: 20}}>
                <Card
                  key={rank.id}
                  header={
                    <>
                      <img
                        className="mr-2"
                        src={`${config.rankBadgeURL}/${rank.badge}.gif`}
                        height={50}
                        width={50}
                      />{' '}
                      {rank.name}
                    </>
                  }
                >
                  <p style={{marginLeft: 60, marginTop: -20}}>
                    <Icon className="text-info mr-2" type="info-circle" />
                    {(rank as any).desc}
                  </p>
                  {rank.users!.map(user => (
                    <div key={user.id} className="mt-4">
                      <UserContainer
                        user={user as any}
                        showJob={false}
                        showGang={false}
                        showPolitics={false}
                      />
                    </div>
                  ))}
                  {rank.users!.length === 0 && <p>This position is empty</p>}
                </Card>
              </div>
            ))
          ) : (
            <div className="col-6">
              <Card header="Staff">
                <div className="row">
                  <div className="col-2">
                    <Skeleton circle height={100} width={100} />
                  </div>
                  <div className="col-8">
                    <div className="mt-3">
                      <Skeleton width={200} height={20} />
                      <br />
                      <Skeleton width={200} height={20} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Row>
      </Container>
    </UserLayout>
  );
}
