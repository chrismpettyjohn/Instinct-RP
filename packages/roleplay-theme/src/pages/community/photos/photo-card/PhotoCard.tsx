import React, {useContext} from 'react';
import {PhotoCardProps} from './PhotoCard.types';
import {Row} from '../../../../components/generic/row/Row';
import {Icon} from '../../../../components/generic/icon/Icon';
import {Card} from '../../../../components/generic/card/Card';
import {Avatar, photoService, sessionContext} from '@instinct-web/core';
import Moment from 'moment';
import {PhotoReaction} from '@instinct-prj/interface';
import {toast} from 'react-toastify';

export function PhotoCard({photo, onChange}: PhotoCardProps) {
  const {user} = useContext(sessionContext);

  const [likeReactions, dislikeReactions] = [
    photo.reactions.filter(_ => _.reaction === PhotoReaction.Like),
    photo.reactions.filter(_ => _.reaction === PhotoReaction.Dislike),
  ];

  const [alreadyLiked, alreadyDisliked] = [
    !!likeReactions.filter(_ => _.user.id === user?.id),
    !!dislikeReactions.filter(_ => _.user.id === user?.id),
  ];

  async function onReact(reaction: PhotoReaction) {
    try {
      await photoService.reactByID(`${photo.id}`, reaction);
      toast.success(`You ${reaction}d ${photo.user!.username}'s photo`);
      onChange();
    } catch (e) {
      toast.error(`You failed to ${reaction} ${photo.user!.username}'s photo`);
    }
  }

  return (
    <div className="col-4 mb-4" key={`photo_${photo.id}`}>
      <Card>
        <div className="col-12">
          <div
            style={{
              width: 250,
              height: 250,
              backgroundImage: `url(${photo.imagePath})`,
              backgroundSize: 'cover',
              display: 'flex',
              position: 'relative',
            }}
          >
            <div
              className="w-100"
              style={{
                alignSelf: 'flex-end',
                opacity: 0.6,
                height: 50,
              }}
            >
              <div className="bg-dark h-100 float-right" style={{width: 120}} />
            </div>
            <div style={{position: 'absolute', bottom: 0, right: 0}}>
              <div className="p-2">
                <Icon
                  className="text-success"
                  type="thumbs-up"
                  style={{opacity: alreadyLiked ? 1 : 0.8, cursor: 'pointer'}}
                  onClick={() => onReact(PhotoReaction.Like)}
                />{' '}
                {likeReactions.length}
                <Icon
                  className="text-danger ml-4"
                  type="thumbs-down"
                  style={{opacity: alreadyDisliked ? 1 : 0.8}}
                  onClick={() => onReact(PhotoReaction.Dislike)}
                />{' '}
                {dislikeReactions.length}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Row>
          <div className="col-6">
            <Avatar look={photo.user!.figure} headOnly />
            <b>{photo.user!.username}</b>
          </div>
          <div className="col-6 text-right">
            <div className="mt-3">
              {Moment.unix(photo.createdAt).format('MM/DD/YY')}
            </div>
          </div>
        </Row>
      </Card>
    </div>
  );
}
