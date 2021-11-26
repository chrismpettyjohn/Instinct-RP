import React from 'react';
import {Col} from 'reactstrap';
import {Card} from '../components/card/Card';
import {setURL, Icon} from '@instinct-web/core';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';

setURL('rp-admin/rooms', <ListRooms />);

export function ListRooms() {
  return (
    <AdminLayout permission="websiteShowAdminPanel">
      <Jumbotron style={{background: '#263238'}} title="Manage Rooms">
        Here you can update various RP settings for rooms in-game
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
                    <th scope="col">Abilities</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Bank of Bobba</td>
                    <td style={{overflow: 'hidden'}}>
                      <div className="badge badge-pill badge-dark  mr-2">
                        Bank
                      </div>
                      <div className="badge badge-pill badge-dark">
                        Taxi Enabled
                      </div>
                    </td>
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
