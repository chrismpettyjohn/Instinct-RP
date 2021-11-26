import Moment from 'moment';
import {Link, useRoute} from 'wouter';
import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Avatar, setURL} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {Icon} from '../../../components/generic/icon/Icon';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {useFetchLawByID} from '@instinct-plugin/roleplay-web';
import {Container} from '../../../components/generic/container/Container';
import {LawVoteStatus} from '@instinct-plugin/roleplay-types';
import {LawActions} from './law-actions/LawActions';
import {getPrettyLawStatus} from './bill.const';

setURL('government/laws/view/:lawID', <LawView />);

export function LawView() {
  const [matched, params] = useRoute<{lawID: string}>(
    '/government/laws/view/:lawID'
  );
  const [reload, setReload] = useState(0);

  const law = useFetchLawByID(params!.lawID, reload);

  const fancyTitle = law ? `A-${law.id} ${law.title}` : '';

  const ayeVotes = law?.votes?.filter(_ => _.status === LawVoteStatus.Approved);
  const nayVotes = law?.votes?.filter(_ => _.status === LawVoteStatus.Rejected);

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-8 d-flex">
            <Link to="/government/laws">
              <Icon
                className="fa-4x text-white"
                style={{cursor: 'pointer'}}
                type="caret-left"
              />
            </Link>
            <h2 className="text-white ml-4" style={{marginTop: 10}}>
              {fancyTitle}
            </h2>
          </div>
          <div className="col-4 text-right">
            <h3 className="mt-3">
              <b>{law?.status ? getPrettyLawStatus(law.status) : ''}</b>
            </h3>
          </div>
        </Row>
        {law !== undefined && (
          <Row>
            <div className="col-12">
              <Card className="mb-4">
                <div className="row">
                  <div className="col-4 mb-4">
                    <h4>Type:</h4>
                    <p>General Bill</p>
                  </div>
                  <div className="col-4 mb-4">
                    <h4>Long Title:</h4>
                    <p>{law.description}</p>
                  </div>
                  <div className="col-4 mb-4">
                    <h4>Effective Date:</h4>
                    <p>N/A</p>
                  </div>
                  <div className="col-4 mb-4">
                    <h4>Supporter</h4>
                    <div className="d-flex mt-2">
                      <Link to={`/profile/${law.user.username}`}>
                        <div className="member-container">
                          <div className="member-content">
                            <div
                              className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                              style={{overflow: 'hidden'}}
                            >
                              <Avatar look={law.user.figure} />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="ml-2 mt-2">
                        <h4>{law.user.username}</h4>
                        <p>{law.user.rank.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 mb-4">
                    <h4>Voted "Aye"</h4>
                    {ayeVotes?.length}
                  </div>
                  <div className="col-4 mb-4">
                    <h4>Voted "Nay"</h4>
                    {nayVotes?.length}
                  </div>
                </div>
              </Card>
              <Card className="mb-4" header="Bill Votes">
                <Row>
                  <div
                    className="col-6 bg-success p-4"
                    style={{borderRight: '1px solid white'}}
                  >
                    <h4>"Aye"</h4>
                    {ayeVotes?.length === 0 && <p>There are no aye votes</p>}
                    {ayeVotes?.map(_ => (
                      <div className="d-flex mt-2" key={`nay_vote_${_.id}`}>
                        <Link to={`/profile/${_.user.username}`}>
                          <div className="member-container">
                            <div className="member-content">
                              <div
                                className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                                style={{overflow: 'hidden'}}
                              >
                                <Avatar look={_.user.figure} />
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="ml-2 mt-2">
                          <h4>{_.user.username}</h4>
                          <p>{_.user.rank.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-6 bg-danger p-4">
                    <h4>"Nay"</h4>
                    {nayVotes?.length === 0 && <p>There are no nay votes</p>}
                    {nayVotes?.map(_ => (
                      <div className="d-flex mt-2" key={`nay_vote_${_.id}`}>
                        <Link to={`/profile/${_.user.username}`}>
                          <div className="member-container">
                            <div className="member-content">
                              <div
                                className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                                style={{overflow: 'hidden'}}
                              >
                                <Avatar look={_.user.figure} />
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="ml-2 mt-2">
                          <h4>{_.user.username}</h4>
                          <p>{_.user.rank.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Row>
              </Card>
              <Card className="mb-4" header="Bill Events">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Event</th>
                      <th scope="col">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {' '}
                    {law?.events?.map(event => (
                      <tr key={`event_${event.id}`}>
                        <th scope="row">
                          <div
                            dangerouslySetInnerHTML={{__html: event.event}}
                          />
                        </th>
                        <td>
                          {' '}
                          {Moment.unix(event.timestamp).format(
                            'MMMM DD, YYYY (hh:mmA)'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <Card className="mb-4">
                <LawActions law={law} onChange={() => setReload(_ => _ + 1)} />
              </Card>
              <Card className="mb-4" header="Bill Text">
                <ReactMarkdown>{law.content}</ReactMarkdown>
              </Card>
            </div>
          </Row>
        )}
      </Container>
    </UserLayout>
  );
}
