import {LawEntity} from './law.entity';
import {Law, RPUser} from '@instinct-plugin/roleplay-types';

export function lawWire(lawEntity: LawEntity, users: RPUser[]): Law {
  return {
    id: lawEntity.id!,
    title: lawEntity.title,
    description: lawEntity.description,
    content: lawEntity.content,
    status: lawEntity.status,
    createdAt: lawEntity.createdAt,
    updatedAt: lawEntity.updatedAt,
    enactedAt: lawEntity.enactedAt,
    presidentialStatus: lawEntity.presidentialStatus,
    presidentialTimestamp: lawEntity.presidentialTimestamp,
    user: users.find(_ => _.id === lawEntity.userID)!,
    votes: lawEntity.votes!.map(lawVote => {
      const user = users.find(_ => _.id === lawVote.userID)!;
      return {
        id: lawVote.id!,
        lawID: lawEntity.id!,
        user,
        status: lawVote.status,
        createdAt: lawVote.createdAt,
        updatedAt: lawVote.updatedAt,
      };
    }),
    comments: lawEntity.comments!.map(lawComment => {
      const user = users.find(_ => _.id === lawComment.userID)!;
      return {
        id: lawComment.id!,
        lawID: lawEntity.id!,
        user,
        content: lawComment.content,
        createdAt: lawComment.createdAt,
        updatedAt: lawComment.updatedAt,
      };
    }),
    events: lawEntity.events!.map(event => ({
      id: event.id!,
      lawID: lawEntity.id!,
      event: event.event,
      timestamp: event.timestamp,
    })),
  };
}
