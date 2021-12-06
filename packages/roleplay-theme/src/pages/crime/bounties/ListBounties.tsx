import React from 'react';
import {Link} from 'wouter';
import Moment from 'moment';
import {Input} from 'reactstrap';
import {Avatar, setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {useFetchAllBounties, useFilter} from '@instinct-plugin/roleplay-web';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('crimes/bounties', <ListBounties />);

export function ListBounties() {
  const bounties = useFetchAllBounties();
  const [filter, setFilter] = useFilter();

  const filteredBounties =
    bounties?.filter(
      _ =>
        _.target.username.toLowerCase()?.includes(filter) ||
        _.addedBy.username.toLowerCase()?.includes(filter)
    ) ?? [];

  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>
                <Icon type="sack-dollar" />
                Bounties
              </h1>
              <p>Users on this page have open bounties on their head</p>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card>
              <div className="p-2 mb-3">
                <Input
                  value={filter}
                  onChange={setFilter}
                  placeholder="Search bounties..."
                />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Reward</th>
                    <th scope="col">Added By</th>
                    <th scope="col">Expires At</th>
                  </tr>
                </thead>
                {bounties === undefined && <Icon type="spinner fa-spin" />}
                {bounties && (
                  <tbody>
                    {filteredBounties.map(_ => (
                      <tr key={`bounty${_.id}`} style={{height: 55}}>
                        <td>
                          <Link to={`/profile/${_.target.username}`}>
                            <div className="d-flex" style={{marginTop: -15}}>
                              <Avatar look={_.target.figure} headOnly />
                              <h4 style={{marginTop: 20}}>
                                {_.target.username}
                              </h4>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <Icon className="text-success" type="dollar-sign" />
                          {_.reward.toLocaleString()}
                        </td>
                        <td>
                          <Link to={`/profile/${_.addedBy.username}`}>
                            <div className="d-flex" style={{marginTop: -15}}>
                              <Avatar look={_.addedBy.figure} headOnly />
                              <h4 style={{marginTop: 20}}>
                                {_.addedBy.username}
                              </h4>
                            </div>
                          </Link>
                        </td>
                        <td>{Moment.unix(_.expiresAt).format('MM/DD/YYYY')}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </Card>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
