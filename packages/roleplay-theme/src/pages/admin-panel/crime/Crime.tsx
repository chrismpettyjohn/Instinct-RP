import React from 'react';
import {Icon} from '@instinct-web/core';
import {Link, useLocation} from 'wouter';
import {Card} from '../components/card/Card';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';
import {AdminLayoutProps} from '../components/admin-layout/AdminLayout.types';

const userLinks: Array<{text: string; icon: string; to: string}> = [
  {
    text: 'Laws',
    icon: 'gavel',
    to: '/rp-admin/crime/laws',
  },
  {
    text: 'Bounties',
    icon: 'skull-crossbones',
    to: '/rp-admin/crime/bounties',
  },
];

export function CrimeLayout({children}: Omit<AdminLayoutProps, 'permission'>) {
  const [location] = useLocation();

  function getHeader() {
    return (
      <ul className="nav nav-tabs">
        {userLinks.map(_ => (
          <Link key={`link_${_.to}`} to={_.to}>
            <li
              className={location === _.to ? 'nav-link active' : 'nav-link'}
              style={{cursor: 'pointer', fontSize: '1.2rem'}}
            >
              {_.text}
              <Icon className="ml-2" type={_.icon} />
            </li>
          </Link>
        ))}
      </ul>
    );
  }

  return (
    <AdminLayout permission="websiteManageRP">
      <Jumbotron style={{background: '#263238'}} title="Crime Settings">
        <p>
          Here you can manage various settings for your RP relating to crime
        </p>
      </Jumbotron>
      <div className="page-content">
        <Card header={getHeader()}>{children}</Card>
      </div>
    </AdminLayout>
  );
}
