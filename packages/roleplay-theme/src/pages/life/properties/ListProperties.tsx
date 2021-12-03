import React from 'react';
import {Link} from 'wouter';
import {Row} from '../../../components/generic/row/Row';
import {setURL, Avatar, Icon} from '@instinct-web/core';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {BuyPropertyModal} from './buy-property-modal/BuyPropertyModal';
import {SellPropertyModal} from './sell-property-modal/SellPropertyModal';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {MakeOfferOnPropertyModal} from './make-offer-on-property-modal/MakeOfferOnPropertyModal';

setURL('properties', <ListProperties />);

export function ListProperties() {
  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <div className="row">
                <div className="col-6">
                  <h1>
                    <Icon type="sign" />
                    Real Estate
                  </h1>
                  <p>Check out some of these hot deals on the market</p>
                </div>
                <div className="col-6 text-right">
                  <SellPropertyModal onChange={() => {}} />
                </div>
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h3>My Properties</h3>
              <Link to="/properties/1">
                <img
                  className="mr-2"
                  src="https://game.bobba.ca/clips/11.png"
                  width={80}
                  height={80}
                  style={{border: '2px solid white', borderRadius: '100%'}}
                />
              </Link>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card>
              <div className="d-flex">
                <Link to="/properties/1">
                  <img
                    src="https://game.bobba.ca/clips/10.png"
                    width={300}
                    height={300}
                    style={{
                      border: '2px solid white',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  />
                </Link>
                <div className="ml-4 text-uppercase w-100">
                  <div className="row">
                    <div className="col-6">
                      <Link to="/properties/1">
                        <h2 style={{cursor: 'pointer'}}>Warehouse #4</h2>
                      </Link>
                    </div>
                    <div className="col-6 text-right">
                      <Link to={'/properties/1'}>
                        <button className="btn btn-outline-info">
                          View More
                          <Icon className="ml-2" type="angle-right" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div style={{borderRight: '1px solid white'}}>
                      <h3 className="mr-2 pr-2 mb-0">
                        <Icon className="text-success" type="dollar-sign" />{' '}
                        5,000
                      </h3>
                      <small>Buy Now</small>
                    </div>
                    <div className="pl-2">
                      <h3 className="mb-0">
                        <Icon className="text-danger" type="dollar-sign" />{' '}
                        3,500
                      </h3>
                      <small>Last Bid</small>
                    </div>
                  </div>
                  <h3 className="mt-2 mb-0">Details</h3>
                  <p style={{height: 40}}>
                    This property boasts a whopping 30x30 square tiles of
                    warehouse space!
                  </p>
                  <h3>Listed By</h3>
                  <Link to="/profile/Chris">
                    <div
                      className="d-flex"
                      style={{
                        background: '#124B77',
                        cursor: 'pointer',
                        padding: 2,
                        borderRadius: 4,
                      }}
                    >
                      <Avatar
                        look="ea-1403-63.ch-3077-1325-110.hr-125-61.lg-285-89.fa-1201-0.sh-3027-110-1408.hd-3103-1.he-8394-110.wa-2009-1325"
                        headOnly
                      />
                      <h4 className="ml-2 mt-4">Chris</h4>
                    </div>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
