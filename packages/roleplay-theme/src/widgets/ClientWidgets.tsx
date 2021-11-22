import React, {useContext} from 'react';
import {GangInfoWidget} from './gang/GangInfo';
import {BetaNotice} from './notice/BetaNotice';
import {GangInviteWidget} from './gang/GangInvite';
import {JobOfferWidget} from './job-offer/JobOffer';
import {BottomBar} from './ui/bottom-bar/BottomBar';
import {GangDisbandWidget} from './gang/GangDisband';
import {configContext, Icon} from '@instinct-web/core';
import {UserStatusWidget} from './ui/user-status/UserStatus';

export function ClientWidgets() {
  const {config} = useContext(configContext);

  if (!config.websocketEnabled) {
    return (
      <div className="float-right">
        <div className="bg-danger mt-4 mr-4 p-1" style={{borderRadius: 4}}>
          <Icon type="exclamation-triangle" />
          <b>UI Disabled</b>
        </div>
        <div className="bg-danger mt-2 mr-4 p-1" style={{borderRadius: 4}}>
          <Icon type="exclamation-triangle" />
          <b>Web Sockets Disabled</b>
        </div>
      </div>
    );
  }

  return (
    <>
      <BetaNotice />
      <BottomBar />
      <UserStatusWidget />
      <GangInfoWidget />
      <GangDisbandWidget />
      <GangInviteWidget />
      <JobOfferWidget />
    </>
  );
}
