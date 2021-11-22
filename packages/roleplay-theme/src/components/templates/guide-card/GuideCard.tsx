import {Link} from 'wouter';
import React from 'react';
import {Row} from '../../generic/row/Row';
import {Avatar, Icon} from '@instinct-web/core';
import {Card} from '../../generic/card/Card';
import {GuideCardProps} from './GuideCard.types';
import {GuideReaction} from '@instinct-plugin/roleplay-types';

export function GuideCard({guide}: GuideCardProps) {
  return (
    <Link to={`/guides/view/${guide.id}`}>
      <div>
        <Card className="business-card">
          <Row>
            <div className="col-6">
              <div className="avatar">
                <Avatar
                  look={guide.user.figure}
                  direction={2}
                  gesture="sml"
                  size="l"
                />
              </div>
            </div>
            <div className="col-6 text-right">
              <h2
                className="text-uppercase"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                {guide.name}
              </h2>
              <p style={{marginTop: -10}}>
                Created by: <b>{guide.user.username}</b>
              </p>
              <p>
                <small>
                  <b className="text-success">
                    <Icon type="thumbs-up" />{' '}
                    {
                      guide.reactions.filter(
                        _ => _.reaction === GuideReaction.Like
                      ).length
                    }{' '}
                    user(s)
                  </b>{' '}
                  found this helpful
                </small>
              </p>
              <p>
                <small>
                  <b className="text-danger">
                    <Icon type="thumbs-down" />{' '}
                    {
                      guide.reactions.filter(
                        _ => _.reaction === GuideReaction.Dislike
                      ).length
                    }{' '}
                    user(s)
                  </b>{' '}
                  found this bad
                </small>
              </p>
            </div>
          </Row>
        </Card>
      </div>
    </Link>
  );
}
