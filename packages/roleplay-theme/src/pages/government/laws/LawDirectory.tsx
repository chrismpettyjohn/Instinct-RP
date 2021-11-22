import './LawDirectory.scss';
import {Link} from 'wouter';
import {uniqBy} from 'lodash';
import React, {useContext, useState} from 'react';
import {Law} from '@instinct-plugin/roleplay-types';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {useFetchLaws} from '../../../hooks/law/fetch-laws';
import {
  Icon,
  Input,
  Select,
  setURL,
  Avatar,
  configContext,
} from '@instinct-web/core';
import {Container} from '../../../components/generic/container/Container';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {getPrettyLawStatus} from './bill.const';

setURL('government/laws', <LawDirectory />);

export function LawDirectory() {
  const laws = useFetchLaws();
  const {config} = useContext(configContext);
  const [billNameFilter, setBillNameFilter] = useState<string>();
  const [billSponsorFilter, setBillSponsorFilter] = useState<number>();

  function filterByName(law: Law): boolean {
    if (!billNameFilter) return true;
    return (
      law.id.toString().includes(billNameFilter) ||
      law.title.toLowerCase().includes(billNameFilter) ||
      law.description.toLowerCase().includes(billNameFilter)
    );
  }

  function filterBySponsor(law: Law): boolean {
    if (!billSponsorFilter) return true;
    return law.user.id === billSponsorFilter;
  }

  const uniqueSponsors = uniqBy(laws?.map(_ => _.user) ?? [], 'id').map(_ => ({
    value: _.id,
    label: _.username,
  }));

  const filteredBills = laws?.filter(filterByName).filter(filterBySponsor);

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <div className="row">
                <div className="col-6">
                  <h1>Laws of {config.siteName}</h1>
                  <p>
                    The following are bills submitted to the National Assembly
                  </p>
                </div>
                <div className="col-6 text-right">
                  <RPPermissionGuard
                    permission="websiteProposeLaws"
                    redirect={false}
                  >
                    <Link to="/government/laws/create">
                      <button className="btn btn-success btn-lg">
                        <Icon type="plus-circle" />
                        Propose Law
                      </button>
                    </Link>
                  </RPPermissionGuard>
                </div>
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <Row>
                <div className="col-12 mb-4">
                  <h2>Search</h2>
                </div>
                <div className="col-6">
                  <h4>Bill Text</h4>
                  <Input
                    value={billNameFilter ?? ''}
                    name="bill_filter"
                    placeholder="Search by text..."
                    type="text"
                    onChange={(key, value) =>
                      setBillNameFilter(value.toLowerCase())
                    }
                  />
                </div>
                <div className="col-6">
                  <h4>Bill Sponsor</h4>
                  <Select
                    options={uniqueSponsors}
                    value={uniqueSponsors.find(
                      _ => _.value === billSponsorFilter
                    )}
                    onChange={(_: any) => setBillSponsorFilter(_.value)}
                  />
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {laws === undefined && (
            <div className="text-center" style={{color: 'white'}}>
              <Icon type="spin" className="fa-spin" />
              <h4>Fetching bills...</h4>
            </div>
          )}
          {filteredBills?.map(bill => (
            <div className="col-6 mb-2" key={`bill_${bill.id}`}>
              <Card
                className="law-card"
                header={
                  <Link to={`/government/laws/view/${bill.id}`}>
                    A-{bill.id}: {bill.title}
                  </Link>
                }
              >
                <div className="d-flex">
                  <div className="member-container">
                    <div className="member-content">
                      <div
                        className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                        style={{overflow: 'hidden'}}
                      >
                        <Avatar look={bill.user.figure} />
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4>
                      Type: <b>General Bill</b>{' '}
                    </h4>
                    <h4>
                      Proposed By: <b>{bill.user.username}</b>
                    </h4>
                    <h4>
                      Status: <b>{getPrettyLawStatus(bill.status)}</b>
                    </h4>
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
