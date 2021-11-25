import React, {useEffect, useState} from 'react';
import {initRoleplayAdminPanel} from '@instinct-plugin/roleplay-admin';
import { RoleplayTheme, initRoleplayTheme } from '@instinct-theme/roleplay';

export function InstinctWeb() {
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    async function initInstinctWeb() {
      await initRoleplayTheme();
      await initRoleplayAdminPanel();
      setInitiated(true);
    }

    if (!initiated) {
      initInstinctWeb();
    }
  })

  if (!initiated) {
    return <i className="fa fa-spin fa-spinner" />;
  }
  return <RoleplayTheme />;
}
