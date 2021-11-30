import React, {useContext} from 'react';
import {setURL} from '@instinct-web/core';
import {UserLayout} from '../../../components/layout/user';
import {rpUserContext} from '@instinct-plugin/roleplay-web';
import {BetaNoticeCard} from './beta-notice-card/BetaNoticeCard';
import {GetInTouchCard} from './get-in-touch-card/GetInTouchCard';
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
        <div className="row">
          <div className="col-8">
            <MyProfile />
            {rpUser && <MyEmploymentCard user={rpUser} />}
          </div>
          <div className="col-4">
            <RecentNews />
            <BetaNoticeCard />
            <GetInTouchCard />
          </div>
        </div>
      </Container>
    </UserLayout>
  );
}
