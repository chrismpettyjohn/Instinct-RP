import {Link} from 'wouter';
import React, {useContext, useState} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Icon, Input, Select, sessionContext, setURL} from '@instinct-web/core';
import {Container} from '../../../components/generic/container/Container';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {useFetchPoliticalParties} from '@instinct-plugin/roleplay-web';
import {PoliticalPartyCard} from '../../../components/templates/political-party-card/PoliticalPartyCard';

setURL('government/parties', <PartyDirectory />);

export function PartyDirectory() {
  const {user} = useContext(sessionContext);
  const politicalParties = useFetchPoliticalParties();

  const [partyNameFilter, setPartyNameFilter] = useState('');

  const filteredParties = politicalParties?.filter(_ =>
    _.name.toLowerCase().includes(partyNameFilter)
  );

  const ownedPoliticalParties = politicalParties?.filter(
    _ => _.founder!.id === user!.id
  );

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <Row>
                <div className="col-6">
                  <h1>Political Parties</h1>
                  <p>Check out all these cults</p>
                </div>
                <div className="col-6 text-right">
                  {ownedPoliticalParties?.length === 0 && (
                    <RPPermissionGuard
                      permission="websiteRegisterPoliticalParty"
                      redirect={false}
                    >
                      <Link to="/government/parties/create">
                        <button className="btn btn-success btn-lg">
                          <Icon type="plus-circle" />
                          Register Party
                        </button>
                      </Link>
                    </RPPermissionGuard>
                  )}
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <Row>
                <div className="col-12">
                  <Input
                    value={partyNameFilter ?? ''}
                    name="party_filter"
                    placeholder="Search by party..."
                    type="text"
                    onChange={(key, value) =>
                      setPartyNameFilter(value.toLowerCase())
                    }
                  />
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {filteredParties?.map(politicalParty => (
            <div className="col-6" key={`political_party_${politicalParty.id}`}>
              <PoliticalPartyCard politicalParty={politicalParty} />
            </div>
          ))}
        </Row>
      </Container>
    </UserLayout>
  );
}
