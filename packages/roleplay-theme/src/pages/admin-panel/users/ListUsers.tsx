import React from 'react';
import {Col} from 'reactstrap';
import {Card} from '../components/card/Card';
import {setURL, Icon} from '@instinct-web/core';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';

setURL('rp-admin/users', <ListUsers />);

export function ListUsers() {
  return (
    <AdminLayout permission="websiteShowAdminPanel">
      <Jumbotron style={{background: '#263238'}} title="Manage Users">
        Here you can update various RP stats for users in-game
      </Jumbotron>
      <div className="page-content">
        <div className="row">
          <Col xs={12}>
            <Card>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Max Health</th>
                    <th scope="col">Max Energy</th>
                    <th scope="col">Max Hunger</th>
                    <th scope="col">Max Armor</th>
                    <th scope="col">Employer</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Chris</td>
                    <td>
                      5 <Icon className="text-danger" type="heart" />
                    </td>
                    <td>
                      5
                      <span style={{color: 'yellow'}}>
                        <Icon type="bolt" />
                      </span>
                    </td>
                    <td>
                      5 <Icon type="drumstick" />
                    </td>
                    <td>
                      5 <Icon className="text-info" type="shield" />
                    </td>
                    <td>Government</td>
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
                </tbody>
              </table>
            </Card>
          </Col>
        </div>
      </div>
    </AdminLayout>
  );
}
