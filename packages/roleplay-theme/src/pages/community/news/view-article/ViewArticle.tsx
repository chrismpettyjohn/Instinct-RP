import './ViewArticle.scss';
import Moment from 'moment';
import React, {useState} from 'react';
import {Link, useRoute} from 'wouter';
import ReactMarkdown from 'react-markdown';
import {ViewComments} from './view-comments/ViewComments';
import {Row} from '../../../../components/generic/row/Row';
import {Card} from '../../../../components/generic/card/Card';
import {UserLayout} from '../../../../components/layout/user/UserLayout';
import {Container} from '../../../../components/generic/container/Container';
import {
  Avatar,
  setURL,
  useFetchArticleByID,
  useFetchArticleByUser,
  Icon,
} from '@instinct-web/core';
import {MiniJumbotron} from '../../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('community/news/:articleID', <ViewArticle />);

export function ViewArticle() {
  const [match, params] = useRoute<{articleID: string}>(
    '/community/news/:articleID'
  );
  const [refresh, setRefresh] = useState(0);

  function refreshArticle() {
    setRefresh(_ => _ + 1);
  }

  const article = useFetchArticleByID(params!.articleID, refresh);
  const articlesByAuthor = useFetchArticleByUser(article?.author?.id);
  const otherArticlesByAuthor =
    articlesByAuthor?.filter(_ => _.id !== article?.id) ?? [];

  if (!article) {
    return (
      <UserLayout section="article">
        <Container>
          <Row>
            <div className="col-12">
              <Link to="/community/news">
                <div style={{cursor: 'pointer', color: 'white'}}>
                  <Icon className="fa-4x" type="caret-left" />
                </div>
              </Link>
            </div>
          </Row>
          <Row>
            <div className="col-12">
              <Icon type="spinner fa-spin fa-3x" />
            </div>
          </Row>
        </Container>
      </UserLayout>
    );
  }

  return (
    <UserLayout section="article">
      <Container>
        <Row className="mb-2">
          <div className="col-12">
            <Link to="/community/news">
              <div style={{cursor: 'pointer', color: 'white'}}>
                <Icon className="fa-4x" type="caret-left" />
              </div>
            </Link>
          </div>
        </Row>
        <Row className="mb-4">
          <div className="col-12">
            <MiniJumbotron
              className="text-center mb-0"
              style={{
                backgroundImage: `url(${article.headerImage}`,
                backgroundSize: 'cover',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                height: 180,
              }}
            >
              <h2>{article.title}</h2>
              <h4>{article.description}</h4>
              <div className="w-50" style={{margin: '0 auto'}}>
                <hr />
                <p>
                  Posted on{' '}
                  <b>
                    {Moment.unix(article.datePosted).format('MMM DD, YYYY')}
                  </b>
                </p>
              </div>
            </MiniJumbotron>
          </div>
        </Row>
        <Row className="mb-2">
          <div className="col-8">
            <Card>
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </Card>
          </div>
          <div className="col-4">
            <Card header="About the Author">
              <Row>
                <div className="avatar" style={{marginLeft: -20}}>
                  <Avatar
                    look={article.author.figure}
                    direction={2}
                    gesture="sml"
                    size="l"
                  />
                </div>
                <div>
                  <Link to={`/profile/${article.author.username}`}>
                    <h4>{article.author.username}</h4>
                  </Link>
                  <div className="badge badge-primary">
                    {article.author.rank!.name}
                  </div>
                </div>
              </Row>
            </Card>
            <Card header="Other Articles by the Author">
              {articlesByAuthor ? (
                <div
                  className="related-articles-container"
                  style={{maxHeight: 200, overflowY: 'scroll'}}
                >
                  {otherArticlesByAuthor.map(_ => (
                    <Link
                      className="related-article-container"
                      key={`article_${_.id}`}
                      to={`/community/news/${_.id}`}
                    >
                      <div
                        className="related-article-thumbnail"
                        style={{backgroundImage: `url(${_.thumbnailImage})`}}
                      />
                      <div className="related-article-details">
                        <div className="related-article-title">{_.title}</div>
                        <div className="related-article-date">
                          {Moment.unix(_.datePosted).format('MMM DD, YYYY')}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {otherArticlesByAuthor.length === 0 && (
                    <p>{article.author.username} hasn't posted more articles</p>
                  )}
                </div>
              ) : (
                <>
                  <Icon type="spinner fa-spin" /> Loading...
                </>
              )}
            </Card>
            <ViewComments article={article} onChange={refreshArticle} />
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
