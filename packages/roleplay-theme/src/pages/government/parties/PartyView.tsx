import Moment from 'moment';
import React, {useContext, useState} from 'react';
import {Link, useRoute} from 'wouter';
import {Avatar, configContext, Input, setURL} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {Icon} from '../../../components/generic/icon/Icon';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {UserContainer} from '../../../components/templates/user-container/UserContainer';
import {Container} from '../../../components/generic/container/Container';
import {useFetchPoliticalPartyByID} from '../../../hooks/political-party/fetch-political-party-by-id';
import {capitalize} from '@material-ui/core';
import {PartyActions} from './party-actions/PartyActions';

setURL('government/parties/view/:partyID', <PartyView />);

export function PartyView() {
  const {config} = useContext(configContext);
  const [matched, params] = useRoute<{partyID: string}>(
    '/government/parties/view/:partyID'
  );
  const [reload, setReload] = useState(0);

  const [usernameFilter, setUsernameFilter] = useState('');

  const politicalParty = useFetchPoliticalPartyByID(params!.partyID, reload);

  function getPartyMembersHeader() {
    return (
      <Row>
        <div className="col-6">
          Party Members ({politicalParty?.members?.length ?? 0})
        </div>
        <div className="col-6">
          <Input
            type="text"
            name="username"
            onChange={(key, value) => setUsernameFilter(value.toLowerCase())}
            placeholder="Filter by username..."
            value={usernameFilter}
          />
        </div>
      </Row>
    );
  }

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12 d-flex">
            <Link to="/government/parties">
              <Icon
                className="fa-4x text-white"
                style={{cursor: 'pointer'}}
                type="caret-left"
              />
            </Link>
            <h2 className="text-white ml-4" style={{marginTop: 10}}>
              {politicalParty?.name}
            </h2>
          </div>
        </Row>
        <Row>
          <div className="col-12 mb-4">
            <Card>
              <Row>
                <div className="col-4 mb-4">
                  <h4>Description</h4>
                  <p>{politicalParty?.description}</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Ideology</h4>
                  <p>{capitalize(politicalParty?.ideology ?? '')}</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Established</h4>
                  <p>
                    {Moment.unix(politicalParty?.createdAt ?? 0).format(
                      'MMMM DD, YYYY'
                    )}
                  </p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Founded By</h4>
                  <div className="d-flex">
                    <Link to={`/profile/${politicalParty?.founder?.username}`}>
                      <div className="member-container">
                        <div className="member-content">
                          <div
                            className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                            style={{overflow: 'hidden'}}
                          >
                            <Avatar look={politicalParty?.founder?.figure} />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="ml-4">
                      <Link
                        to={`/profile/${politicalParty?.founder?.username}`}
                      >
                        <h4 className="mt-4">
                          <b>{politicalParty?.founder?.username}</b>
                        </h4>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-2 mb-4">
                  <h4>Badge</h4>
                  <img
                    src={`${config.swfBadgeURL}/${politicalParty?.badge}.gif`}
                  />
                </div>
              </Row>
              <hr />
              <Row>
                <div className="col-12 mb-4">
                  <h4>About</h4>
                  <p>{politicalParty?.about}</p>
                </div>
              </Row>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="col-12 mb-4">
            <Card header={getPartyMembersHeader()}>
              <Row>
                {politicalParty?.members?.map(member => (
                  <div className="col-6 mb-2" key={`member_${member.id}`}>
                    <UserContainer
                      key={`member_${member.id}`}
                      user={member}
                      showPolitics={false}
                    />
                  </div>
                ))}
              </Row>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="col-12 mb-4">
            <Card>
              {politicalParty && (
                <PartyActions
                  politicalParty={politicalParty}
                  onChange={() => {}}
                />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
