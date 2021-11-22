import {userWire} from '@instinct-api/database';
import {GuideReactionEntity} from './guide-reaction.entity';
import {GuideUserReaction} from '@instinct-plugin/roleplay-types';

export function guideReactionWire(
  entity: GuideReactionEntity
): GuideUserReaction {
  return {
    user: userWire(entity.user!),
    reaction: entity.reaction,
  };
}
