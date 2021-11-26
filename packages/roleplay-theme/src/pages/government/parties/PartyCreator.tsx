import React from 'react';
import {Link, useLocation} from 'wouter';
import {toast} from 'react-toastify';
import {setURL} from '@instinct-web/core';
import {Icon} from '../../../components/generic/icon/Icon';
import {Card} from '../../../components/generic/card/Card';
import {Row} from '../../../components/generic/row/Row';
import {EditPoliticalParty} from './edit-party/EditParty';
import {UserLayout} from '../../../components/layout/user';
import {PoliticalPartyDTO} from '@instinct-plugin/roleplay-types';
import {politicalPartyService} from '@instinct-plugin/roleplay-web';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('government/parties/create', <PartyCreator />);

export function PartyCreator() {
  const [location, setLocation] = useLocation();

  async function onSubmit(politicalPartyDTO: PoliticalPartyDTO) {
    const newPoliticalParty = await politicalPartyService.create(
      politicalPartyDTO
    );
    toast.success(`${politicalPartyDTO.name} has successfully been registered`);
    setLocation(`/government/parties/view/${newPoliticalParty.id}`);
  }

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <Link to="/government/parties">
              <Icon
                className="fa-4x text-white"
                style={{cursor: 'pointer'}}
                type="caret-left"
              />
            </Link>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Political Party Registration Form</h1>
              <p>
                This form is required under Section (x) of the Elections Act,
                2021.
              </p>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card>
              <EditPoliticalParty onSubmit={onSubmit} />
            </Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
