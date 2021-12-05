import {Link} from 'wouter';
import {Input} from 'reactstrap';
import React, {useContext} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {setURL, Avatar, Icon, sessionContext} from '@instinct-web/core';
import {Container} from '../../../components/generic/container/Container';
import {SellPropertyModal} from './sell-property-modal/SellPropertyModal';
import {useFetchAllProperties, useFilter} from '@instinct-plugin/roleplay-web';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('properties', <ListProperties />);

export function ListProperties() {
  const [filter, setFilter] = useFilter();
  const {user} = useContext(sessionContext);
  const properties = useFetchAllProperties();

  const ownedProperties = properties?.filter(_ => _.user.id === user?.id);

  const filteredProperties =
    properties?.filter(_ => _.room.roomName.toLowerCase().includes(filter)) ??
    [];

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
                  <SellPropertyModal />
                </div>
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h3>My Properties</h3>
              <div className="d-flex">
                {ownedProperties?.map(_ => (
                  <Link
                    key={`owned_property_${_.id}`}
                    to={`/properties/${_.id}`}
                  >
                    <div
                      className="mr-4"
                      style={{
                        border: '2px solid white',
                        borderRadius: '100%',
                        backgroundImage: `url(${
                          _.photos[0]?.photoURL ??
                          'https://i.imgur.com/RJnrGFD.png'
                        })`,
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                        width: 80,
                        height: 80,
                      }}
                    />
                  </Link>
                ))}
                {ownedProperties?.length === 0 && (
                  <p>You don't have any properties listed for sale</p>
                )}
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        <Row className="mb-4">
          <div className="col-6">
            <h3 className="text-white">Properties For Sale</h3>
          </div>
          <div className="col-6">
            <Input
              value={filter}
              onChange={setFilter}
              placeholder="Search properties..."
            />
          </div>
        </Row>
        <Row>
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
          {filteredProperties?.map(_ => (
            <div className="col-12 mb-4" key={`property_${_.id}`}>
              <Card>
                <div className="d-flex">
                  <Link to={`/properties/${_.id}`}>
                    <div
                      style={{
                        display: 'block',
                        backgroundImage: `url(${
                          _.photos[0]?.photoURL ??
                          'https://i.imgur.com/RJnrGFD.png'
                        })`,
                        backgroundSize: 'cover',
                        border: '2px solid white',
                        borderRadius: 4,
                        cursor: 'pointer',
                        height: 300,
                        width: 300,
                      }}
                    />
                  </Link>
                  <div className="ml-4 text-uppercase w-100">
                    <div className="row">
                      <div className="col-6">
                        <Link to={`/properties/${_.id}`}>
                          <h2 style={{cursor: 'pointer'}}>{_.room.roomName}</h2>
                        </Link>
                      </div>
                      <div className="col-6 text-right">
                        <Link to={`/properties/${_.id}`}>
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
