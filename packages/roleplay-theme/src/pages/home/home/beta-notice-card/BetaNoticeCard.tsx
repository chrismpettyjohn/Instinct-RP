import React from 'react';
import {Card} from '../../../../components/generic/card/Card';

export function BetaNoticeCard() {
  return (
    <Card header="Notice">
      <p>We are still undergoing extensive beta testing and changes.</p>
      <p>You may encounter bugs, partial features or other various problems</p>
      <p>
        Please report any problems under the <code>#user-experience</code>{' '}
        channel.
      </p>
    </Card>
  );
}
