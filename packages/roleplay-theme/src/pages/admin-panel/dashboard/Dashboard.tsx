import React from 'react';
import {setURL} from '@instinct-web/core';
import {GlobCard} from './glob-card/GlobCard';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';

setURL('rp-admin', <Dashboard />);

export function Dashboard() {
  return (
    <AdminLayout permission="websiteShowAdminPanel">
      <Jumbotron style={{background: '#263238'}} title="RP Admin Panel">
        <p>Welcome to the RP admin panel</p>
      </Jumbotron>
      <div className="page-content">
        <GlobCard />
      </div>
    </AdminLayout>
  );
}
