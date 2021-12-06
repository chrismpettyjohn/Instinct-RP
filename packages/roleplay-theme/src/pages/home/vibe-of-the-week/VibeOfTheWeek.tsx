import React from 'react';
import {setURL, Icon} from '@instinct-web/core';
import {Card} from '../../../components/generic/card/Card';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';

setURL('vibe-of-the-week', <VibeOfTheWeek />);

export function VibeOfTheWeek() {
  return (
    <UserLayout>
      <Container>
        <div className="row">
          <div className="col-8">
            <Card
              className="h-100"
              header={
                <>
                  <Icon type="heart" />
                  Vibe of the Week
                </>
              }
            >
              <iframe
                width="100%"
                height={500}
                src="https://www.youtube-nocookie.com/embed/cZzK32Cfcq8?controls=0&autoplay=1"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </Card>
          </div>
          <div className="col-4">
            <Card
              className="h-100"
              header={
                <>
                  <Icon type="crown" /> Our Lord
                </>
              }
            >
              <img
                className="h-100"
                src="https://s.abcnews.com/images/International/gy_putin_dc_011718_2x3_992.jpg"
              />
            </Card>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-8">
            <Card className="h-100" header="Putin once said...">
              <p>
                My name is Vladimir Putin. I'm 67 years old. My house is in the
                northeast section of Moscow, where all the Kremlin buildings
                are, and I am not married. I work as the president for the
                country of Russia, and I get home every day by 8 PM at the
                latest. I don't smoke, but I occasionally drink. I'm in bed by
                11 PM, and make sure I get eight hours of sleep, no matter what.
                After having a glass of warm vodka and doing about twenty
                minutes of gopnik squats before going to bed, I usually have no
                problems sleeping until morning. Just like a hibernating bear, I
                wake up without any fatigue or stress in the morning. I was told
                there were no issues at my last check-up. I'm trying to explain
                that I'm a person who wishes to live a very quiet life. I take
                care not to trouble myself with any political enemies, like
                winning and losing, that would cause me to lose sleep at night.
                That is how I deal with Russia , and I know that is what brings
                me happiness. Although, if I were to fight I wouldn't lose to
                anyone.
              </p>
            </Card>
          </div>
          <div className="col-4">
            <Card className="h-100" header="Long live Russia">
              <img
                className="h-100"
                src="https://api.time.com/wp-content/uploads/2014/03/time-pol-putin-crimea-russia-140318.jpg"
              />
            </Card>
          </div>
        </div>
      </Container>
    </UserLayout>
  );
}
