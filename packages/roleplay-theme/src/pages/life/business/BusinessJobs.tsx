import {Col} from 'reactstrap';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {useFetchAllBusinesses} from '@instinct-plugin/roleplay-web';
import {BusinessCard} from '../../../components/templates/business-card';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

import {Input, setURL} from '@instinct-web/core';
import {NotAddedNotice} from '../../../components/templates/not-added-notice/NotAddedNotice';

setURL('businesses/jobs', <JobMarket />);

export function JobMarket() {
  const businesses = useFetchAllBusinesses();
  const [filter, setFilter] = useState('');

  const filteredBusinesses =
    businesses?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <NotAddedNotice />
          </div>
          <div className="col-12">
            <MiniJumbotron>
              <h1>
                <Icon type="user-tie" />
                Job Market
              </h1>
              <p>
                You can find job advertisements posted by various businesses
                here
              </p>
            </MiniJumbotron>
          </div>
        </Row>
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
