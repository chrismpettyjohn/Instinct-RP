import {random} from 'lodash';
import {Col} from 'reactstrap';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Card} from '../../components/card/Card';

const YOUTUBE_IDS = [
  'DVQsKYPm7mA',
  '_ieCjpmliSg',
  '47ZSI7nPAqo',
  'wEpJU3xqeSE',
  'xu6y_i8LWss',
  '35BE84yRadU',
];

export function GlobCard() {
  const [randomVideo, setRandomVideo] = useState(YOUTUBE_IDS[0]);

  function changeVideo() {
    const randomIndex = random(0, YOUTUBE_IDS.length);
    const randomYoutubeVideo = YOUTUBE_IDS[randomIndex];
    setRandomVideo(randomYoutubeVideo);
  }

  function getHeader() {
    return (
      <div className="row">
        <div className="col-6">Sponsored Video</div>
        <div className="col-6 text-right">
          <div style={{cursor: 'pointer'}} onClick={changeVideo}>
            <Icon type="sync" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <Col xs={8}>
        <Card style={{height: '100%'}} header={getHeader()}>
          <iframe
            width="100%"
            height={500}
            src={`https://www.youtube-nocookie.com/embed/${randomVideo}?controls=0&autoplay=1`}
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
