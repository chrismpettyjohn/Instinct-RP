import React from 'react';
import {Col} from 'reactstrap';
import {Card} from '../components/card/Card';
import {setURL, Icon} from '@instinct-web/core';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {useFetchAllCrimes} from '../../../hooks/crime/fetch-all';
import {AdminLayout} from '../components/admin-layout/AdminLayout';

setURL('rp-admin/crimes', <ListCrime />);

export function ListCrime() {
  const crimes = useFetchAllCrimes();

  return (
    <AdminLayout permission="websiteManageCrimes">
      <Jumbotron style={{background: '#263238'}} title="Manage Crimes">
        Here you can update various crimes in-game
      </Jumbotron>
      <div className="page-content">
        <div className="row">
          <Col xs={12}>
            <Card header="Rooms">
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
                    {crimes.map(_ => (
                      <tr key={`crime_${_.id}`}>
                        <th scope="row">{_.id}</th>
                        <td>{_.name}</td>
                        <td>{_.aliases}</td>
                        <td>
                          {_.ticketable ? (
                            <>
                              Yes{' '}
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
                          <button className="btn btn-outline-primary mr-2">
                            <Icon type="pencil" />
                            Edit
                          </button>
                          <button className="btn btn-outline-danger">
                            <Icon type="trash" />
                            Delete
                          </button>
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
