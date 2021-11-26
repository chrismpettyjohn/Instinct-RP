import {useContext} from 'react';
import {useLocation} from 'wouter';
import {rpUserContext} from '@instinct-plugin/roleplay-web';
import {RPPermissionGuardProps} from './PermissionGuard.types';

export function RPPermissionGuard({
  children,
  permission,
  redirect = true,
}: RPPermissionGuardProps) {
  const [location, setLocation] = useLocation();
  const {rpUser} = useContext(rpUserContext);
  const hasPermission = !!rpUser?.rank?.permissions?.[permission];

  if (!hasPermission) {
    if (redirect) {
      setLocation(rpUser ? '/me' : '/login');
    }

    return null;
  }

  return children;
}
