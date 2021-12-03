import {Link} from 'wouter';
import React, {useContext} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {useFetchAllProperties} from '@instinct-plugin/roleplay-web';
import {setURL, Avatar, Icon, sessionContext} from '@instinct-web/core';
import {Container} from '../../../components/generic/container/Container';
import {SellPropertyModal} from './sell-property-modal/SellPropertyModal';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('properties', <ListProperties />);

export function ListProperties() {
  const {user} = useContext(sessionContext);
  const properties = useFetchAllProperties();

  const ownedProperties = properties?.filter(_ => _.user.id === user?.id);

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
              {ownedProperties?.map(_ => (
                <Link key={`owned_property_${_.id}`} to={`/properties/${_.id}`}>
                  <img
                    className="mr-2"
                    src={_.photos[0]?.photoURL}
                    width={80}
                    height={80}
                    style={{border: '2px solid white', borderRadius: '100%'}}
                  />
                </Link>
              ))}
              {ownedProperties?.length === 0 && (
                <p>You don't have any properties listed for sale</p>
              )}
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <h3 className="text-white">Properies For Sale</h3>
          </div>
          {properties === undefined && (
            <div className="col-12 text-center text-white">
              <h3>
                <Icon className="fa-3x fa-spin" type="fa-spinner" />
                Loading Properties...
              </h3>
            </div>
          )}
          {properties?.length === 0 && (
            <div className="col-12 text-white">
              <p>There are no properties for sale</p>
            </div>
          )}
          {properties?.map(_ => (
            <div className="col-12" key={`property_${_.id}`}>
              <Card>
                <div className="d-flex">
                  <Link to={`/properties/${_.id}`}>
                    <img
                      src={_.photos[0]?.photoURL}
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
                          <h2 style={{cursor: 'pointer'}}>{_.room.roomName}</h2>
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
                          {_.buyNowPrice.toLocaleString()}
                        </h3>
                        <small>Buy Now</small>
                      </div>
                      <div className="pl-2">
                        <h3 className="mb-0">
                          {_.bids[0] ? (
                            <>
                              <Icon
                                className="text-danger"
                                type="dollar-sign"
                              />
                              {_.bids[0].offer.toLocaleString() ?? 'N/A'}
                            </>
                          ) : (
                            'N/A'
                          )}
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
                    <Link to={`/profile/${_.user.username}`}>
                      <div
                        className="d-flex"
                        style={{
                          background: '#124B77',
                          cursor: 'pointer',
                          padding: 2,
                          borderRadius: 4,
                        }}
                      >
                        <Avatar look={_.user.figure} headOnly />
                        <h4 className="ml-2 mt-4">{_.user.username}</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </UserLayout>
  );
}
