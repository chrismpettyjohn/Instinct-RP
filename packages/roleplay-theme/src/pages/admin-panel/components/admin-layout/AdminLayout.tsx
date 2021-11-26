import React from 'react';
import {Header} from './header/Header';
import {Footer} from './footer/Footer';
import {AdminLayoutProps} from './AdminLayout.types';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';

export function AdminLayout({children, permission}: AdminLayoutProps) {
  const body = (
    <>
      <span className="page-container">
        <Header />
        <main>
          <section className="page-container">{children}</section>
        </main>
      </span>
      <Footer />
    </>
  );

  if (!permission) return body;

  return <RPPermissionGuard permission={permission}>{body}</RPPermissionGuard>;
}
