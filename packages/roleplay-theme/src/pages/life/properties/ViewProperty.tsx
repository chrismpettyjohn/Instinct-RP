import Moment from 'moment';
import {Link, useRoute} from 'wouter';
import React, {useContext, useState} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {PropertyBid} from '@instinct-plugin/roleplay-types';
import {useFetchPropertyByID} from '@instinct-plugin/roleplay-web';
import {BuyPropertyModal} from './buy-property-modal/BuyPropertyModal';
import {Avatar, setURL, Icon, sessionContext} from '@instinct-web/core';
import {Container} from '../../../components/generic/container/Container';
import {EditPropertyModal} from './edit-property-modal/EditPropertyModal';
import {MakeOfferOnPropertyModal} from './make-offer-on-property-modal/MakeOfferOnPropertyModal';
import {DeletePropertyModal} from './delete-property-modal/DeletePropertyModal';

setURL('properties/:propertyID', <ViewProperty />);

export function ViewProperty() {
  const {user} = useContext(sessionContext);
  const [refresh, setRefresh] = useState(0);
  const [matched, params] = useRoute<{propertyID: string}>(
    '/properties/:propertyID'
  );

  const property = useFetchPropertyByID(params!.propertyID, refresh);

  const isPropertyOwner = user?.id === property?.user?.id;

  function reloadProperty() {
    setRefresh(_ => _ + 1);
  }

  function getBidStatus(bidStatus: PropertyBid) {
    const [color, label] =
      bidStatus.approved === undefined
        ? ['warning', 'This bid has not been reviewed yet']
        : bidStatus.approved
        ? ['success', 'This bid has been accepted']
        : ['danger', 'This bid was rejected'];

    return <div className={`alert alert-${color} text-white`}>{label}</div>;
  }

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
              Viewing Property: <b>{property?.room?.roomName ?? ''}</b>
            </h2>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card className="mb-4">
              <div className="row">
                <div className="col-4 mb-4">
                  <h4>Zoning:</h4>
                  <p>N/A</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Status:</h4>
                  <p className="text-success">For Sale</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Listed At:</h4>
                  <p>
                    {property &&
                      Moment.unix(property.listedAt).format('MMM DD, YYYY')}
                  </p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Owner</h4>
                  {property && (
                    <div className="d-flex mt-2">
                      <Link to={`/profile/${property.user.username}`}>
                        <div className="member-container">
                          <div className="member-content">
                            <div
                              className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                              style={{overflow: 'hidden'}}
                            >
                              <Avatar look={property.user.figure} />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="ml-2 mt-2">
                        <h4>{property.user.username}</h4>
                        <p>{property.user.rank.name}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-4 mb-4">
                  <h4>Asking Price:</h4>
                  <Icon className="text-success" type="dollar-sign" />
                  {property?.buyNowPrice?.toLocaleString() ?? ''}
                </div>
                <div className="col-4 mb-4">
                  <h4>Latest Bid:</h4>
                  {property?.bids?.[0] ? (
                    <>
                      <Icon className="text-success" type="dollar-sign" />
                      {property.bids[0].offer.toLocaleString()}
                    </>
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>
            </Card>
            <Card className="mb-4" header="Tools">
              {property ? (
                <div className="row">
                  <div
                    className="col-6"
                    style={{borderRight: '1px solid white'}}
                  >
                    <BuyPropertyModal
                      property={property}
                      onChange={reloadProperty}
                    />
                    <MakeOfferOnPropertyModal
                      property={property}
                      onChange={reloadProperty}
                    />
                  </div>
                  <div className="col-6 text-right">
                    {isPropertyOwner && (
                      <>
                        <EditPropertyModal
                          property={property}
                          onChange={reloadProperty}
                        />
                        <DeletePropertyModal property={property} />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <Icon className="fa-spin" type="fa-spinner" />
              )}
            </Card>
            <Card className="mb-4" header="Bids">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Accepted</th>
                  </tr>
                </thead>
                <tbody>
                  {property?.bids?.length === 0 && (
                    <p className="p-2">There are no bids yet</p>
                  )}
                  {property?.bids?.map(bid => (
                    <tr key={`bid_${bid.id}`}>
                      <td>
                        <div
                          className="d-flex"
                          style={{marginTop: -20, marginLeft: -10}}
                        >
                          <Avatar look={bid.user.figure} headOnly />
                          <span className="mt-4">{bid.user.username}</span>
                        </div>
                      </td>
                      <td>
                        <Icon className="text-success" type="dollar-sign" />
                        {bid.offer.toLocaleString()}
                      </td>
                      <td>{getBidStatus(bid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <Card className="mb-4" header="Pictures">
              <div className="d-flex">
                {property?.photos?.map(_ => (
                  <img
                    className="mr-4"
                    key={`photo_${_.id}`}
                    style={{
                      display: 'block',
                      backgroundImage: `url(${_.photoURL})`,
                      backgroundSize: 'cover',
                      border: '2px solid white',
                      borderRadius: 4,
                      cursor: 'pointer',
                      height: 300,
                      width: 300,
                    }}
                  />
                ))}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
