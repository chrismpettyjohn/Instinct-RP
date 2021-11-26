import React from 'react';
import {Col} from 'reactstrap';
import {setURL} from '@instinct-web/core';
import {Card} from '../components/card/Card';
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
            <Card header="Rooms">Coming Soon</Card>
          </Col>
        </div>
      </div>
    </AdminLayout>
  );
}
