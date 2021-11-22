import React from 'react';
import {toast} from 'react-toastify';
import {Link, useRoute} from 'wouter';
import {setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {EditPoliticalParty} from './edit-party/EditParty';
import {PoliticalPartyDTO} from '@instinct-plugin/roleplay-types';
import {politicalPartyService} from '../../../services/political-party';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {useFetchPoliticalPartyByID} from '../../../hooks/political-party/fetch-political-party-by-id';

setURL('government/parties/edit/:partyID', <PartyEditor />);

export function PartyEditor() {
  const [matched, params] = useRoute<{partyID: string}>(
    '/government/parties/edit/:partyID'
  );
  const politicalParty = useFetchPoliticalPartyByID(params!.partyID);

  async function onSubmit(politicalPartyDTO: PoliticalPartyDTO) {
    try {
      await politicalPartyService.updateByID(
        politicalParty!.id,
        politicalPartyDTO
      );
      toast.success(
        `Your changes have been saved to ${politicalPartyDTO.name}`
      );
    } catch {
      toast.error(`Failed to update ${politicalParty!.name}`);
    }
  }

  const basePoliticalPartyDTO: PoliticalPartyDTO | undefined =
    politicalParty && {
      name: politicalParty.name,
      description: politicalParty.description,
      about: politicalParty.about,
      badge: politicalParty.badge,
      ideology: politicalParty.ideology,
    };

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <Link to={`/government/parties/view/${politicalParty?.id}`}>
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
              {basePoliticalPartyDTO && (
                <EditPoliticalParty
                  basePoliticalPartyDTO={basePoliticalPartyDTO}
                  onSubmit={onSubmit}
                />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
