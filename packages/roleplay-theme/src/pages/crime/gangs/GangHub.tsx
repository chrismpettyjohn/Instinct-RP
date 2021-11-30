import {Link} from 'wouter';
import React, {useState} from 'react';
import {useFetchAllGangs} from '@instinct-plugin/roleplay-web';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {GangCard} from '../../../components/templates/gang-card';
import {Container} from '../../../components/generic/container/Container';
import {setURL, PermissionGuard, Icon, Input} from '@instinct-web/core';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('gangs', <GangHub />);

export function GangHub() {
  const gangs = useFetchAllGangs();
  const [filter, setFilter] = useState('');

  const filteredGangs =
    gangs?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  return (
    <UserLayout section="community_team">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <div className="row">
                <div className="col-6">
                  <h1>
                    <Icon type="skull-crossbones" />
                    Gangs
                  </h1>
                  <p>Can you survive the criminal underworld?</p>
                </div>
                <div className="col-6 text-right">
                  <PermissionGuard
                    permission={'websiteCreateBusiness' as any}
                    redirect={false}
                  >
                    <Link to="/gangs/creator">
                      <button className="btn btn-success btn-lg">
                        <Icon type="plus-circle" />
                        Form Gang
                      </button>
                    </Link>
                  </PermissionGuard>
                </div>
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12 mb-4">
            <Input
              value={filter}
              name="gang_filter"
              type="text"
              placeholder="Search gangs..."
              onChange={(key, value) => setFilter(value.toLowerCase())}
            />
          </div>
        </Row>
        <Row>
          {gangs?.length === 0 && (
            <div className="col-12">
              <Card className="text-center">
                <i className="fa fa-exclamation-circle fa-5x" />
                <h3>There aren't any gangs to show at this time.</h3>
              </Card>
            </div>
          )}
          {(gangs?.length ?? 0) > 0 && filteredGangs.length === 0 && (
            <div className="col-12">
              <Card className="text-center">
                <i className="fa fa-exclamation-circle fa-5x" />
                <h3>No gangs match your criteria</h3>
              </Card>
            </div>
          )}
          {filteredGangs.map(_ => (
            <div className="col-6" key={_.id}>
              <GangCard gang={_} />
            </div>
          ))}
        </Row>
      </Container>
    </UserLayout>
  );
}
