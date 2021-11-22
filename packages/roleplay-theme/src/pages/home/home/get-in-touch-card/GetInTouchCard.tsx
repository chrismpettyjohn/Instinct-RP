import React from 'react';
import './GetInTouchCard.scss';
import {Card} from '../../../../components/generic/card/Card';

export function GetInTouchCard() {
  return (
    <Card header="Get In Touch">
      <div className="social-media-link">
        <a
          href="https://discord.com/channels/857134668770705438/857145468604907522#:~:text=https%3A//discord.gg/bobba"
          target="_blank"
        >
          <div className="row">
            <div className="col-2 text-center">
              <i className="fab fa-discord fa-3x" />
            </div>
            <div className="col-10">
              <h3>Discord</h3>
            </div>
          </div>
        </a>
      </div>
    </Card>
  );
}
