import React from 'react';
import {Avatar, Icon} from '@instinct-web/core';
import {exampleUser} from '@instinct-prj/interface';
import {Card} from '../../../../components/generic/card/Card';

export function MostJailTimeCard() {
  function getHeader() {
    return (
      <div className="row">
        <div className="col-6">
          <Icon type="angry" />
        </div>
        <div className="col-6 text-right">Jail Time</div>
      </div>
    );
  }

  return (
    <Card header={getHeader()}>
      <div className="top-user-container">
        <div className="row">
          <div className="col-4">
            <Avatar look={exampleUser.figure} headOnly />
          </div>
          <div className="col-8 text-right">
            <h3>Louis</h3>
            <h5 style={{marginTop: -10}}>
              <b>4 hours</b> served
            </h5>
          </div>
        </div>
      </div>
      <div className="top-user-container">
        <div className="row">
          <div className="col-4">
            <Avatar look={exampleUser.figure} headOnly />
          </div>
          <div className="col-8 text-right">
            <h3>Chris</h3>
            <h5 style={{marginTop: -10}}>
              <b>1 hour</b> served
            </h5>
          </div>
        </div>
      </div>
    </Card>
  );
}
