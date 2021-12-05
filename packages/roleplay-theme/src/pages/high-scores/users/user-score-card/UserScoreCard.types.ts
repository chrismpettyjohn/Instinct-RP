import {ReactNode} from 'react';
import {RPUser} from '@instinct-plugin/roleplay-types';

export interface UserScoreCardProps {
  header: ReactNode;
  headerIcon: string;
  users: RPUser[];
  userStat: (user: RPUser) => any;
  userStatLabel: ReactNode;
}
