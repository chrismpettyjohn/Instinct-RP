import React from 'react';
import {Icon} from '@instinct-web/core';
import {Link, useLocation} from 'wouter';
import {Card} from '../components/card/Card';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {AdminLayout} from '../components/admin-layout/AdminLayout';
import {AdminLayoutProps} from '../components/admin-layout/AdminLayout.types';
import {RPPermissions} from '@instinct-plugin/roleplay-types';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';

const userLinks: Array<{
  text: string;
  icon: string;
  to: string;
  scope: keyof RPPermissions;
}> = [
  {
    text: 'Food',
    icon: 'cheeseburger',
    to: '/rp-admin/game/food',
    scope: 'websiteManageFood',
  },
  {
    text: 'Gambling',
    icon: 'dice-two',
    to: '/rp-admin/game/gambling',
    scope: 'websiteManageGambling',
  },
  {
    text: 'Weapons',
    icon: 'axe',
    to: '/rp-admin/game/weapons',
    scope: 'websiteManageWeapons',
  },
  {
    text: 'Vending Machines',
    icon: 'coin',
    to: '/rp-admin/game/vending-machines',
    scope: 'websiteManageVendingMachines',
  },
];

export function GameLayout({children}: Omit<AdminLayoutProps, 'permission'>) {
  const [location] = useLocation();

  function getHeader() {
    return (
      <ul className="nav nav-tabs">
        {userLinks.map(_ => (
          <RPPermissionGuard
            key={`link_${_.to}`}
            permission={_.scope}
            redirect={false}
          >
            <Link to={_.to}>
              <li
                className={location === _.to ? 'nav-link active' : 'nav-link'}
                style={{cursor: 'pointer', fontSize: '1.2rem'}}
              >
                {_.text}
                <Icon className="ml-2" type={_.icon} />
              </li>
            </Link>
          </RPPermissionGuard>
        ))}
      </ul>
    );
  }

  return (
    <AdminLayout>
      <Jumbotron style={{background: '#263238'}} title="RP Settings">
        <p>Here you can manage various settings for your RP</p>
      </Jumbotron>
      <div className="page-content">
        <Card header={getHeader()}>{children}</Card>
      </div>
    </AdminLayout>
  );
}
