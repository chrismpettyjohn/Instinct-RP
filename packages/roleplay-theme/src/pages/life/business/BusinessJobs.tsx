import {Col} from 'reactstrap';
import React, {useState} from 'react';
import {Icon, Input, setURL} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {BusinessPositionCard} from './business-position-card/BusinessPositionCard';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {useFetchAllBusinesses, useFetchOpenPositions} from '@instinct-plugin/roleplay-web';

setURL('businesses/jobs', <JobMarket />);

export function JobMarket() {
  const businesses = useFetchAllBusinesses();
  const positions = useFetchOpenPositions();
  const [filter, setFilter] = useState('');

  const isLoading = businesses === undefined || positions === undefined;

  const filteredPositions =
    positions?.filter(_ => _.name.toLowerCase().includes(filter)) ?? [];

  return (
    <UserLayout>
      <Container>
        <Row>>
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
              placeholder="Search positions..."
              type="text"
              onChange={(key, value) => setFilter(value.toLowerCase())}
            />
          </div>
        </Row>
        {
          !isLoading && (
            <Row>
              {filteredPositions?.map(_ => (
                <Col key={`position_${_.id}`} xs={6}>
                  <BusinessPositionCard business={businesses.find(bus => bus.id === _.businessID)!} position={_} />
                </Col>
              ))}
            </Row>
          )
        }
        {(positions?.length ?? 0) > 0 && filteredPositions.length === 0 && (
          <div className="col-12">
            <Card className="text-center">
              <i className="fa fa-exclamation-circle fa-5x" />
              <h3>No positions match your criteria</h3>
            </Card>
          </div>
        )}
        {positions?.length === 0 && (
          <Row>
            <div className="col-12">
              <Card className="text-center">
                <i className="fa fa-exclamation-circle fa-5x" />
                <h3>There aren't any open positions at this time.</h3>
              </Card>
            </div>
          </Row>
        )}
      </Container>
    </UserLayout>
  );
}
