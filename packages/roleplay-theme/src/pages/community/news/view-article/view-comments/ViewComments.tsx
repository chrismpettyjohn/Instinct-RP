import React from 'react';
import {ViewCommentProps} from './ViewComments.types';
import {CommentBlock} from './comment-block/CommentBlock';
import {Row} from '../../../../../components/generic/row/Row';
import {Card} from '../../../../../components/generic/card/Card';
import {CreateCommentModal} from '../create-comment-modal/CreateCommentModal';

export function ViewComments({article, onChange}: ViewCommentProps) {
  const reversedComments = [...article.comments].reverse();

  function getHeader() {
    return (
      <Row>
        <div className="col-6">Comments</div>
        <div className="col-6 text-right">
          <CreateCommentModal article={article} onCreation={onChange} />
        </div>
      </Row>
    );
  }

  return (
    <Card header={getHeader()}>
      <div style={{maxHeight: 600, overflowY: 'scroll'}}>
        {article.comments.length === 0 && <p>There are no comments</p>}
        {reversedComments.map(_ => (
          <CommentBlock
            comment={_}
            key={`comment_${_.id}`}
            onChange={onChange}
          />
        ))}
      </div>
    </Card>
  );
}
