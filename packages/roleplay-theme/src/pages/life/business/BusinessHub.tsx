import {Link} from 'wouter';
import {Col} from 'reactstrap';
import React, {useContext, useState} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {useFetchAllBusinesses} from '@instinct-plugin/roleplay-web';
import {BusinessCard} from '../../../components/templates/business-card';
import {Container} from '../../../components/generic/container/Container';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

import {
  configContext,
  Icon,
  Input,
  sessionContext,
  setURL,
} from '@instinct-web/core';

setURL('businesses', <BusinessHub />);

export function BusinessHub() {
  const {config} = useContext(configContext);
  const {user} = useContext(sessionContext);
  const businesses = useFetchAllBusinesses();
  const ownedBusinesses =
    businesses?.filter(_ => _.owner.id === user!.id) ?? [];
  const [filter, setFilter] = useState('');

  const filteredBusinesses =
    businesses?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <div className="row">
                <div className="col-6">
                  <h1>
                    <Icon type="building" />
                    Business Hub
                  </h1>
                  <p>Elevate your career to the next level</p>
                </div>
                <div className="col-6 text-right">
                  <RPPermissionGuard
                    permission="websiteCreateBusiness"
                    redirect={false}
                  >
                    <Link to="/business/creator">
                      <button className="btn btn-success btn-lg">
                        <Icon type="plus-circle" />
                        Create A Business
                      </button>
                    </Link>
                  </RPPermissionGuard>
                </div>
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        {ownedBusinesses.length > 0 && (
          <Row>
            <div className="col-12">
              <MiniJumbotron>
                <h3>My Businesses</h3>
                <div className="row p-2" style={{marginTop: -15}}>
                  {ownedBusinesses.map(_ => (
                    <Link key={_.id} to={`/businesses/${_.id}`}>
                      <div className="d-inline">
                        <img
                          className="business-badge mr-3"
                          src={`${config.swfBadgeURL}/${_.badge}.gif`}
                          style={{height: 60, width: 60}}
                          onError={(event: any) =>
                            (event.target.style.display = 'none')
                          }
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </MiniJumbotron>
            </div>
          </Row>
        )}
        <Row>
          <div className="col-12 mb-4">
            <Input
              value={filter}
              name="business_filter"
              placeholder="Search businesses..."
              type="text"
              onChange={(key, value) => setFilter(value.toLowerCase())}
            />
          </div>
        </Row>
        <Row>
          {filteredBusinesses?.map(_ => (
            <Col key={_.id} xs={6}>
              <BusinessCard business={_} />
            </Col>
          ))}
        </Row>
        {(businesses?.length ?? 0) > 0 && filteredBusinesses.length === 0 && (
          <div className="col-12">
            <Card className="text-center">
              <i className="fa fa-exclamation-circle fa-5x" />
              <h3>No businesses match your criteria</h3>
            </Card>
          </div>
        )}
        {businesses?.length === 0 && (
          <Row>
            <div className="col-12">
              <Card className="text-center">
                <i className="fa fa-exclamation-circle fa-5x" />
                <h3>There aren't any businesses to show at this time.</h3>
              </Card>
            </div>
          </Row>
        )}
      </Container>
    </UserLayout>
  );
}
