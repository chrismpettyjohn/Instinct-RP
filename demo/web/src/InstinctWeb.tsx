import React from 'react';
import { AdminPanel } from '@instinct-web/admin';
import { RoleplayTheme } from '@instinct-theme/roleplay';
import {RoleplayAdminPanel} from '@instinct-plugin/roleplay-admin/src';

export function InstinctWeb() {
  return (
    <>
      <RoleplayTheme />
      <AdminPanel />
      <RoleplayAdminPanel />
    </>
  );
}
