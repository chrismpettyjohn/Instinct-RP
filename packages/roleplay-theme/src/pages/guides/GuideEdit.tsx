import React, {useContext, useState} from 'react';
import {Link, useRoute} from 'wouter';
import {Avatar, Icon, sessionContext, setURL} from '@instinct-web/core';
import {Row} from '../../components/generic/row/Row';
import {Card} from '../../components/generic/card/Card';
import {UserLayout} from '../../components/layout/user';
import {Container} from '../../components/generic/container/Container';
import {MiniJumbotron} from '../../components/generic/mini-jumbotron/MiniJumbotron';
import Moment from 'moment';
import {GuideDTO, GuideReaction} from '@instinct-plugin/roleplay-types';
import ReactMarkdown from 'react-markdown';
import {useFetchGuideByID} from '../../hooks/guide/fetch-guide-by-id';
import {GuideEditor} from './guide-editor/GuideEditor';
import {guideService} from '../../services/guide';
import {toast} from 'react-toastify';

setURL('guides/edit/:guideID', <GuideEdit />);

export function GuideEdit() {
  const {user} = useContext(sessionContext);
  const [refresh, setRefresh] = useState(0);
  const [matched, params] = useRoute<{guideID: string}>(
    '/guides/edit/:guideID'
  );

  const guide = useFetchGuideByID(params!.guideID, refresh);

  if (guide && guide.user.id !== user?.id) {
    return <Link to={`/guides/view/${guide?.id}`} />;
  }

  const baseGuideDTO: GuideDTO = {
    name: guide?.name ?? '',
    content: guide?.content ?? '',
    categoryID: guide?.category?.id ?? 0,
  };

  async function onSubmit(guideDTO: GuideDTO) {
    try {
      await guideService.updateByID(guide!.id, guideDTO);
      toast.success(`Guide ${guideDTO.name} has been updated`);
      setRefresh(_ => _ + 1);
    } catch {
      toast.error(`Guide ${guide.name} could not be updated at this time`);
    }
  }

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
              Editing Guide:{' '}
              <b>{guide?.name ?? <Icon type="spinner fa-spin" />}</b>
            </h2>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <Card className="mb-4">
              <div className="row">
                <div className="col-4 mb-4">
                  <h4>Category:</h4>
                  <p>
                    {guide?.category?.name ?? <Icon type="spinner fa-spin" />}
                  </p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Created At:</h4>
                  <p>
                    {guide ? (
                      Moment.unix(guide.createdAt).format('MM/DD/YYYY')
                    ) : (
                      <Icon type="spinner fa-spin" />
                    )}
                  </p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Last Updated:</h4>
                  <p>
                    {guide ? (
                      Moment.unix(guide.updatedAt).format('MM/DD/YYYY')
                    ) : (
                      <Icon type="spinner fa-spin" />
                    )}
                  </p>
                </div>
                <div className="col-4 mb-4">
                  <h4>Author</h4>
                  <div className="d-flex mt-2">
                    <Link to={`/profile/${guide?.user?.username}`}>
                      <div className="member-container">
                        <div className="member-content">
                          <div
                            className="member-avatar flex-container flex-vertical-center flex-horizontal-center"
                            style={{overflow: 'hidden'}}
                          >
                            {guide ? (
                              <Avatar look={guide.user.figure} />
                            ) : (
                              <Icon type="spinner fa-spin" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="ml-2 mt-2">
                      <h4>
                        {guide?.user?.username ?? (
                          <Icon type="spinner fa-spin" />
                        )}
                      </h4>
                      <p>
                        {guide?.user?.rank?.name ?? (
                          <Icon type="spinner fa-spin" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4 mb-4">
                  <h4>Upvotes</h4>
                  <span className="text-success">
                    <Icon type="thumbs-up" />{' '}
                    {guide?.reactions?.filter(
                      _ => _.reaction === GuideReaction.Like
                    )?.length ?? <Icon type="spinner fa-spin" />}
                  </span>
                </div>
                <div className="col-4 mb-4">
                  <h4>Downvotes</h4>
                  <span className="text-danger">
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
              {guide ? (
                <GuideEditor baseGuideDTO={baseGuideDTO} onSubmit={onSubmit} />
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
