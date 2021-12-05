import React from 'react';
import Moment from 'moment';
import {setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {UserScoreCard} from './user-score-card/UserScoreCard';
import {useFetchTopUsers} from '@instinct-plugin/roleplay-web';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('high-scores/users', <UserHighScores />);

export function UserHighScores() {
  const userHighScores = useFetchTopUsers();

  return (
    <UserLayout section="games_ranking">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Top Users</h1>
              <p>Can you make it to the top?</p>
              <p>
                <b className="mr-2 text-warning">Last Updated:</b>{' '}
                {userHighScores ? (
                  Moment.unix(userHighScores.timestamp).format(
                    'MMM DD, YYYY hh:mmA'
                  )
                ) : (
                  <Icon type="spinner fa-spin" />
                )}
              </p>
            </MiniJumbotron>
          </div>
        </Row>
        {userHighScores && (
          <>
            <Row>
              <div className="col-4">
                <UserScoreCard
                  header="Most Kills"
                  headerIcon="skull"
                  users={userHighScores.mostKills}
                  userStat={_ => _.rpStats.kills.total}
                  userStatLabel="kills"
                />
              </div>
              <div className="col-4">
                <UserScoreCard
                  header="Most Deaths"
                  headerIcon="dizzy"
                  users={userHighScores.mostDeaths}
                  userStat={_ => _.rpStats.deaths.total}
                  userStatLabel="deaths"
                />
              </div>
              <div className="col-4">
                <UserScoreCard
                  header="Most Damage"
                  headerIcon="fire-alt"
                  users={userHighScores.mostDamageGiven}
                  userStat={_ => _.rpStats.damage.damageGiven}
                  userStatLabel="damage"
                />
              </div>
            </Row>
            <br />
            <Row>
              <div className="col-4">
                <UserScoreCard
                  header="Damage Taken"
                  headerIcon="fire-alt"
                  users={userHighScores.mostDamageReceived}
                  userStat={_ => _.rpStats.damage.damageTaken}
                  userStatLabel="damage"
                />
              </div>
              <div className="col-4">
                <UserScoreCard
                  header="Most Arrests"
                  headerIcon="siren-on"
                  users={userHighScores.mostArrests}
                  userStat={_ => _.rpStats.police.arrestsMade}
                  userStatLabel="arrests"
                />
              </div>
              <div className="col-4">
                <UserScoreCard
                  header="Jail Time"
                  headerIcon="angry"
                  users={userHighScores.mostJailTime}
                  userStat={_ => _.rpStats.police.timesArrested}
                  userStatLabel="times arrested"
                />
              </div>
            </Row>
          </>
        )}
      </Container>
    </UserLayout>
  );
}
