import React from 'react';
import {orderBy} from 'lodash';
import {Input} from 'reactstrap';
import {setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {useFetchAllCrimes, useFilter} from '@instinct-plugin/roleplay-web';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('crimes', <ListCrimes />);

export function ListCrimes() {
  const crimes = useFetchAllCrimes();
  const [filter, setFilter] = useFilter();

  const filteredCrimes =
    crimes?.filter(
      _ =>
        _.name?.toLowerCase()?.includes(filter) ||
        _.aliases?.toLowerCase()?.includes(filter)
    ) ?? [];

  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>
                <Icon type="badge-sheriff" />
                Crimes
              </h1>
              <p>
                The following are crimes and are punishable to the fullest
                extent of the law
              </p>
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
                  placeholder="Search crimes..."
                />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Ticket</th>
                    <th scope="col">Jail Time</th>
                  </tr>
                </thead>
                {crimes === undefined && <Icon type="spinner fa-spin" />}
                {crimes && (
                  <tbody>
                    {orderBy(filteredCrimes, _ => _.jailTimeInMinutes).map(
                      _ => (
                        <tr key={`crime_${_.id}`}>
                          <td>{_.name}</td>
                          <td>
                            {_.ticketable ? (
                              <>
                                <Icon
                                  className="text-success"
                                  type="dollar-sign"
                                />
                                {_.ticketCost}
                              </>
                            ) : (
                              'No'
                            )}
                          </td>
                          <td>{_.jailTimeInMinutes.toLocaleString()}min</td>
                        </tr>
                      )
                    )}
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
