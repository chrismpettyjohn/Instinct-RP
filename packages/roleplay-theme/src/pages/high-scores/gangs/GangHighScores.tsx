import React from 'react';
import Moment from 'moment';
import {setURL, Icon} from '@instinct-web/core';
import {GangScoreCard} from './GangScoreCard';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {useFetchTopGangs} from '@instinct-plugin/roleplay-web';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('high-scores/gangs', <GangHighScores />);

export function GangHighScores() {
  const gangHighScores = useFetchTopGangs();

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Top Gangs</h1>
              <p>Can you make it to the top?</p>
              <p>
                <b className="mr-2 text-warning">Last Updated:</b>{' '}
                {gangHighScores ? (
                  Moment.unix(gangHighScores.timestamp).format(
                    'MMM DD, YYYY hh:mmA'
                  )
                ) : (
                  <Icon type="spinner fa-spin" />
                )}
              </p>
            </MiniJumbotron>
          </div>
        </Row>
        {gangHighScores && (
          <Row>
            <div className="col-4">
              <GangScoreCard
                header="Most Kills"
                headerIcon="skull"
                gangs={gangHighScores.mostKills}
                gangStat={_ => _.stats.kills}
                gangStatLabel="kills"
              />
            </div>
            <div className="col-4">
              <GangScoreCard
                header="Most Deaths"
                headerIcon="dizzy"
                gangs={gangHighScores.mostDeaths}
                gangStat={_ => _.stats.deaths}
                gangStatLabel="deaths"
              />
            </div>
            <div className="col-4">
              <GangScoreCard
                header="Most Turfs"
                headerIcon="cannabi"
                gangs={gangHighScores.mostTurfs}
                gangStat={_ => _.stats.turfs}
                gangStatLabel="turfs"
              />
            </div>
          </Row>
        )}
      </Container>
    </UserLayout>
  );
}
