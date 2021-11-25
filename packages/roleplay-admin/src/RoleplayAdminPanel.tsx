import React, {useEffect} from 'react';

export function RoleplayAdminPanel() {
  useEffect(() => {
    async function loadPages() {
      await import('./bootstrap');
    }

    loadPages();
  }, []);

  return null;
}
