import {ReactNode} from 'react';
import {RPUser} from '@instinct-plugin/roleplay-types';

export interface UserModalProps {
  children: ReactNode;
  user: RPUser;
}
