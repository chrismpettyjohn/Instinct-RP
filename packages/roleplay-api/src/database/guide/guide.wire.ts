import {GuideEntity} from './guide.entity';
import {guideCategoryWire} from './guide-category.wire';
import {guideReactionWire} from './guide-reaction.wire';
import {Guide, RPUser} from '@instinct-plugin/roleplay-types';

export function guideWire(entity: GuideEntity, rpUser: RPUser): Guide {
  return {
    id: entity.id!,
    user: rpUser,
    name: entity.name,
    content: entity.content,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    category: guideCategoryWire(entity.category!),
    reactions: entity.reactions!.map(guideReactionWire),
  };
}
