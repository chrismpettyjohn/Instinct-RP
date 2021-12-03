import React from 'react';
import Confetti from 'react-confetti';
import {Link, useRoute} from 'wouter';
import {setURL, Icon} from '@instinct-web/core';
import useWindowSize from 'react-use/lib/useWindowSize';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {useFetchPropertyByID} from '@instinct-plugin/roleplay-web';
import {Container} from '../../../components/generic/container/Container';

setURL('properties/:propertyID/congratulations', <JustPurchasedProperty />);

export function JustPurchasedProperty() {
  const {width, height} = useWindowSize();
  const [matched, params] = useRoute<{propertyID: string}>(
    '/properties/:propertyID/congratulations'
  );

  const property = useFetchPropertyByID(params!.propertyID);

  return (
    <>
      <Confetti width={width} height={height} />
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
                Just Purchased: <b>{property?.room?.roomName ?? ''}</b>
              </h2>
            </div>
          </Row>
          <Row>
            <div className="col-12 text-center text-white">
              <img src="https://i.imgur.com/i1wsEeR.png" />
              <h1>Congratulations!</h1>
              <h3>
                You are now the lucky owner of{' '}
                <b>{property?.room?.roomName ?? ''}</b>
              </h3>
            </div>
          </Row>
        </Container>
      </UserLayout>
    </>
  );
}
