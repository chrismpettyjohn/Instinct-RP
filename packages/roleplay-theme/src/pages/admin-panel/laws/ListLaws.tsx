import React from 'react';
import {Col} from 'reactstrap';
import {setURL} from '@instinct-web/core';
import {Card} from '../components/card/Card';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';

setURL('rp-admin/laws', <ListLaws />);

export function ListLaws() {
  return (
    <AdminLayout permission="websiteShowAdminPanel">
      <Jumbotron style={{background: '#263238'}} title="Manage Laws">
        Here you can manage laws
      </Jumbotron>
      <div className="page-content">
        <div className="row">
          <Col xs={12}>
            <Card header="Laws">Coming Soon</Card>
          </Col>
        </div>
      </div>
    </AdminLayout>
  );
}
