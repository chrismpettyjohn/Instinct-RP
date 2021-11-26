import React from 'react';
import { AdminPanel } from '@instinct-web/admin';
import { RoleplayTheme } from '@instinct-theme/roleplay';

export function InstinctWeb() {
  return (
    <>
      <RoleplayTheme />
      <AdminPanel />
    </>
  );
}
