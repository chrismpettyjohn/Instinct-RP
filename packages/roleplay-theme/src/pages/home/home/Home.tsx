import React, {useContext} from 'react';
import {Column, setURL} from '@instinct-web/core';
import {UserLayout} from '../../../components/layout/user';
import {rpUserContext} from '../../../context/rp-user/RPUser';
import {BetaNoticeCard} from './beta-notice-card/BetaNoticeCard';
import {GetInTouchCard} from './get-in-touch-card/GetInTouchCard';
import {Card} from '../../../components/generic/card/Card';
import {Container} from '../../../components/generic/container/Container';
import {MyProfile} from '../../../components/templates/my-profile/MyProfile';
import {RecentNews} from '../../../components/templates/recent-news/RecentNews';
import {MyEmploymentCard} from '../../../components/templates/my-employment-card/MyEmploymentCard';

setURL('me', <Home />);
setURL('home', <Home />);
setURL('welcome', <Home />);

export function Home() {
  const {rpUser} = useContext(rpUserContext);
  return (
    <UserLayout>
      <Container>
        <Column side="left">
          <MyProfile />
          {rpUser && <MyEmploymentCard user={rpUser} />}
        </Column>
        <Column side="right">
          <RecentNews />
          <BetaNoticeCard />
          <GetInTouchCard />
        </Column>
      </Container>
    </UserLayout>
  );
}
