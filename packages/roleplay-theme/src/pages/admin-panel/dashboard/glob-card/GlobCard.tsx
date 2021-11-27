import React from 'react';
import {random} from 'lodash';
import {Col} from 'reactstrap';
import {Card} from '../../components/card/Card';

export function GlobCard() {
  const youtubeVideoIDs = [
    'DVQsKYPm7mA',
    '_ieCjpmliSg',
    '47ZSI7nPAqo',
    'wEpJU3xqeSE',
    'xu6y_i8LWss',
    '35BE84yRadU',
  ];

  const randomIndex = random(0, youtubeVideoIDs.length);

  const randomYoutubeVideo = youtubeVideoIDs[randomIndex];

  return (
    <div className="row">
      <Col xs={8}>
        <Card style={{height: '100%'}} header="Sponsored Video">
          <iframe
            width="100%"
            height={500}
            src={`https://www.youtube-nocookie.com/embed/${randomYoutubeVideo}?controls=0&autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{height: '100%'}}
          header={
            <>
              Instinct<b>RP</b>
            </>
          }
        >
          <p>May we all praise our overlord</p>
          <img src="https://64.media.tumblr.com/f9c887180442b31366be5b540c3a47d8/993a091bf5158ed5-4e/s1280x1920/7438ca7c4b01ddae50456b2259cf3c02a08b8328.png" />
          <p>
            "I'm full of schwibbleglibblekind. I am the yeast of thoughts and
            mind."
          </p>
          <p className="text-right">-globgogabgalab</p>
        </Card>
      </Col>
    </div>
  );
}
