import React, {useState} from 'react';
import {Col, Input} from 'reactstrap';
import {Card} from '../components/card/Card';
import {setURL, Icon} from '@instinct-web/core';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {useFetchAllCrimes} from '../../../hooks/crime/fetch-all';
import {AdminLayout} from '../components/admin-layout/AdminLayout';
import {DeleteCrimeModal} from './delete-crime-modal/DeleteCrimeModal';
import {EditCrimeModal} from './edit-crime-modal/EditCrimeModal';
import {useFilter} from '../../../hooks/filter/use-filter';

setURL('rp-admin/crimes', <ListCrime />);

export function ListCrime() {
  const [filter, setFilter] = useFilter();
  const [refresh, setRefresh] = useState(0);
  const crimes = useFetchAllCrimes(refresh);

  const filteredCrimes =
    crimes?.filter(
      _ =>
        _.name?.toLowerCase()?.includes(filter) ||
        _.aliases?.toLowerCase()?.includes(filter)
    ) ?? [];

  function onChange() {
    setRefresh(_ => _ + 1);
  }

  function getHeader() {
    return (
      <div className="row">
        <div className="col-6">Crimes</div>
        <div className="col-6">
          <Input
            value={filter}
            onChange={setFilter}
            placeholder="Search crimes..."
          />
        </div>
      </div>
    );
  }

  return (
    <AdminLayout permission="websiteManageCrimes">
      <Jumbotron style={{background: '#263238'}} title="Manage Crimes">
        Here you can update various crimes in-game
      </Jumbotron>
      <div className="page-content">
        <div className="row">
          <Col xs={12}>
            <Card header={getHeader()}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Aliases</th>
                    <th scope="col">Ticket</th>
                    <th scope="col">Jail Time</th>
                    <th scope="col">Stackable</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                {crimes === undefined && <Icon type="spinner fa-spin" />}
                {crimes && (
                  <tbody>
                    {filteredCrimes.map(_ => (
                      <tr key={`crime_${_.id}`}>
                        <th scope="row">{_.id}</th>
                        <td>{_.name}</td>
                        <td>{_.aliases}</td>
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
                        <td>{_.stackable ? 'Yes' : 'No'}</td>
                        <td>
                          <EditCrimeModal crime={_} onChange={onChange} />
                          <DeleteCrimeModal crime={_} onDelete={onChange} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              <div className="text-right">
                <button className="btn btn-outline-success mr-2">
                  <Icon type="plus" />
                  Add Crime
                </button>
              </div>
            </Card>
          </Col>
        </div>
      </div>
    </AdminLayout>
  );
}
