import Moment from 'moment';
import {Link} from 'wouter';
import React, {useState} from 'react';
import {Avatar} from '@instinct-web/core';
import {CommentBlockProps} from './CommentBlock.types';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {DeleteComment} from '../delete-comment/DeleteComment';
import StaffBadge from '../../../../../../public/img/staff_badge.gif';

export function CommentBlock({comment, onChange}: CommentBlockProps) {
  const [isOpen, setOpen] = useState(false);

  function onToggle() {
    setOpen(_ => !_);
  }

  return (
    <>
      <div className="article-author mt-3 w-100" key={`comment_${comment.id}`}>
        <div className="d-flex">
          <div style={{width: 54}}>
            <Link href={`/profile/${comment.author.username}`}>
              <Avatar
                look={comment.author.figure}
                headOnly
                style={{cursor: 'pointer'}}
              />
            </Link>
          </div>
          <div style={{width: 'calc(100% - 104px)'}}>
            <h4 className="mt-2">
              <Link
                className="text-white"
                href={`/profile/${comment.author.username}`}
                style={{textDecoration: 'none'}}
              >
                {comment.author.username}
              </Link>
            </h4>
            <div
              onClick={onToggle}
              style={{
                cursor: 'pointer',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {comment.content}
            </div>
          </div>
          {comment.author.rank!.permissions.websiteShowStaff && (
            <div style={{width: 50}}>
              <img src={StaffBadge} />
            </div>
          )}
        </div>
        <div className="row" style={{marginLeft: 40, width: '87%'}}>
          <div className="col-6">
            {Moment.unix(comment.timestamp).format('MM/DD/YYYY')}
          </div>
          <div className="col-6 text-right">
            <DeleteComment comment={comment} onDelete={onChange} />
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal isOpen toggle={onToggle}>
          <ModalHeader toggle={onToggle}>
            <b>{comment.author.username}</b> said:
          </ModalHeader>
          <ModalBody>
            <p style={{wordWrap: 'break-word'}}>{comment.content}</p>
            <p>
              Posted on{' '}
              <b>
                {Moment.unix(comment.timestamp).format(
                  'MMMM DD, YYYY (hh:mmA)'
                )}
              </b>
            </p>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
