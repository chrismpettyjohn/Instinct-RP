import React from 'react';
import './UserProfile.scss';
import {Badges} from './badges';
import {useRoute} from 'wouter';
import {Guestbook} from './guestbook';
import {UserContainer} from './user-container';
import {useFetchRPStatsByUsername} from '../../../hooks/user';
import {UserLayout} from '../../../components/layout/user/UserLayout';
import {Container} from '../../../components/generic/container/Container';
import {Jumbotron} from '../../../components/generic/jumbotron/Jumbotron';
import {MyEmploymentCard} from '../../../components/templates/my-employment-card';
import {
  Column,
  Loading,
  setURL,
  useFetchUserByUsername,
} from '@instinct-web/core';

setURL('profile/:username', <UserProfile />);

export function UserProfile() {
  const [match, params] = useRoute<{username: string}>('/profile/:username');
  const profile = useFetchUserByUsername(params!.username);
  const rpStats = useFetchRPStatsByUsername(params!.username);

  return (
    <UserLayout section="profile">
      <Loading isLoading={profile === undefined}>
        <Jumbotron title={`The profile of ${profile?.user?.username}`} />
        <Container>
          <Column side="right">
            <UserContainer profile={profile} />
            <Badges profile={profile} />
          </Column>
          <Column side="left">
            {profile && rpStats && (
              <>
                <MyEmploymentCard user={{...(profile.user as any), rpStats}} />
                <Guestbook profile={profile} />
              </>
            )}
          </Column>
        </Container>
      </Loading>
    </UserLayout>
  );
}
