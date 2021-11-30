import React from 'react';
import {Link} from 'wouter';
import {Avatar, setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {Container} from '../../../components/generic/container/Container';
import {BuyPropertyModal} from './buy-property-modal/BuyPropertyModal';
import {MakeOfferOnPropertyModal} from './make-offer-on-property-modal/MakeOfferOnPropertyModal';

setURL('properties/:propertyID', <ViewProperty />);

export function ViewProperty() {
  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12 d-flex">
            <Link to="/properties">
              <Icon
                className="fa-4x text-white"
                style={{cursor: 'pointer'}}
                type="caret-left"
              />
            </Link>
            <h2 className="text-white ml-4" style={{marginTop: 10}}>
              Viewing Property: <b>Warehouse #4</b>
            </h2>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card className="mb-4">
              <div className="row">
                <div className="col-4 mb-4">
                  <h4>Zoning:</h4>
                  <p>Industrial</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Status:</h4>
                  <p className="text-success">For Sale</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Property Built:</h4>
                  <p>Oct 01, 2021</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Owner</h4>
                  <div className="d-flex mt-2">
                    <Link to={'/profile/Chris'}>
                      <div className="member-container">
                        <div className="member-content">
                          <div
                            className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                            style={{overflow: 'hidden'}}
                          >
                            <Avatar look="ea-1403-63.ch-3077-1325-110.hr-125-61.lg-285-89.fa-1201-0.sh-3027-110-1408.hd-3103-1.he-8394-110.wa-2009-1325" />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="ml-2 mt-2">
                      <h4>Chris</h4>
                      <p>Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 mb-4">
                  <h4>Asking Price:</h4>
                  <Icon className="text-success" type="dollar-sign" />
                  5,000
                </div>
                <div className="col-4 mb-4">
                  <h4>Latest Bid:</h4>
                  <Icon className="text-success" type="dollar-sign" />
                  2,500
                </div>
              </div>
            </Card>
            <Card className="mb-4" header="Tools">
              <BuyPropertyModal onChange={() => {}} />
              <MakeOfferOnPropertyModal onChange={() => {}} />
            </Card>
            <Card className="mb-4" header="Bids">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <div
                        className="d-flex"
                        style={{marginTop: -20, marginLeft: -10}}
                      >
                        <Avatar
                          look="ea-1403-63.ch-3077-1325-110.hr-125-61.lg-285-89.fa-1201-0.sh-3027-110-1408.hd-3103-1.he-8394-110.wa-2009-1325"
                          headOnly
                        />
                        <span className="mt-4">Chris</span>
                      </div>
                    </td>
                    <td>
                      <Icon className="text-success" type="dollar-sign" />
                      2,500
                    </td>
                    <td>11/29/2021</td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <Card className="mb-4" header="Pictures">
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
            </Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
