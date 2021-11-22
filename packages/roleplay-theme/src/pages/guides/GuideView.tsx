import Moment from 'moment';
import {Link, useRoute} from 'wouter';
import React, {useContext, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {guideService} from '../../services/guide';
import {Row} from '../../components/generic/row/Row';
import {Card} from '../../components/generic/card/Card';
import {UserLayout} from '../../components/layout/user';
import {Avatar, Icon, sessionContext, setURL} from '@instinct-web/core';
import {GuideReaction} from '@instinct-plugin/roleplay-types';
import {useFetchGuideByID} from '../../hooks/guide/fetch-guide-by-id';
import {Container} from '../../components/generic/container/Container';
import {MiniJumbotron} from '../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('guides/view/:guideID', <GuideEdit />);

export function GuideEdit() {
  const {user} = useContext(sessionContext);
  const [refresh, setRefresh] = useState(0);
  const [matched, params] = useRoute<{guideID: string}>(
    '/guides/view/:guideID'
  );

  const guide = useFetchGuideByID(params!.guideID, refresh);

  async function reactToGuide(reaction: GuideReaction) {
    await guideService.reactByID(params!.guideID, reaction);
    setRefresh(_ => _ + 1);
  }

  const [likedByUser, dislikedByUser] = [
    !!guide?.reactions?.find(
      _ => _.user.id === user?.id && _.reaction === GuideReaction.Like
    ),
    !!guide?.reactions?.find(
      _ => _.user.id === user?.id && _.reaction === GuideReaction.Dislike
    ),
  ];

  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-8 d-flex">
            <Link to="/guides">
              <Icon
                className="fa-4x text-white"
                style={{cursor: 'pointer'}}
                type="caret-left"
              />
            </Link>
            <h2 className="text-white ml-4" style={{marginTop: 10}}>
              Viewing Guide: <b>{guide?.name}</b>
            </h2>
          </div>
          <div className="col-4 text-right">
            {guide?.user?.id === user!.id && (
              <Link to={`/guides/edit/${guide?.id}`}>
                <button className="btn btn-outline-warning mt-3">Edit</button>
              </Link>
            )}
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card className="mb-4">
              <div className="row">
                <div className="col-4 mb-4">
                  <h4>Category:</h4>
                  <p>{guide?.category.name}</p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Created At:</h4>
                  <p>
                    {Moment.unix(guide?.createdAt ?? 0).format('MM/DD/YYYY')}
                  </p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Last Updated:</h4>
                  <p>
                    {Moment.unix(guide?.updatedAt ?? 0).format('MM/DD/YYYY')}
                  </p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Author</h4>
                  <div className="d-flex mt-2">
                    <Link to={`/profile/${guide?.user.username}`}>
                      <div className="member-container">
                        <div className="member-content">
                          <div
                            className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                            style={{overflow: 'hidden'}}
                          >
                            <Avatar look={guide?.user.figure} />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="ml-2 mt-2">
                      <h4>{guide?.user.username}</h4>
                      <p>{guide?.user.rank.name}</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 mb-4">
                  <h4>Upvotes</h4>
                  <span
                    className="text-success"
                    style={{cursor: 'pointer', opacity: likedByUser ? 1 : 0.65}}
                    onClick={() => reactToGuide(GuideReaction.Like)}
                  >
                    <Icon type="thumbs-up" />{' '}
                    {guide?.reactions?.filter(
                      _ => _.reaction === GuideReaction.Like
                    )?.length ?? <Icon type="spinner fa-spin" />}
                  </span>
                </div>
                <div className="col-4 mb-4">
                  <h4>Downvotes</h4>
                  <span
                    className="text-danger"
                    style={{
                      cursor: 'pointer',
                      opacity: dislikedByUser ? 1 : 0.65,
                    }}
                    onClick={() => reactToGuide(GuideReaction.Dislike)}
                  >
                    <Icon type="thumbs-down" />{' '}
                    {guide?.reactions?.filter(
                      _ => _.reaction === GuideReaction.Dislike
                    )?.length ?? <Icon type="spinner fa-spin" />}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              {guide?.content ? (
                <ReactMarkdown>{guide.content}</ReactMarkdown>
              ) : (
                <Icon type="spinner fa-spin" />
              )}
            </MiniJumbotron>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
