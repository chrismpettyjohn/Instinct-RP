import React from 'react';
import './GetInTouchCard.scss';
import {Card} from '../../../../components/generic/card/Card';

export function GetInTouchCard() {
  return (
    <Card header="Social Media">
      <div className="social-media-link">
        <a
          href="https://discord.com/channels/857134668770705438/857145468604907522#:~:text=https%3A//discord.gg/bobba"
          target="_blank"
        >
          <div className="d-flex">
            <i className="fab fa-discord fa-3x mr-2" />
            <h3>Discord</h3>
          </div>
        </a>
      </div>
    </Card>
  );
}
