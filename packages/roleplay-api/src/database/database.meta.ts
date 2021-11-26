import {Provider} from '@nestjs/common';
import {UserRPStatEntity, UserRPStatRepository} from './user';
import {
  GangEntity,
  GangRepository,
  GangRankEntity,
  GangRankRepository,
} from './gang';
import {
  BusinessEntity,
  BusinessPositionEntity,
  BusinessPositionRepository,
  BusinessRepository,
} from './business';
import {RPRankEntity} from './rank/rank.entity';
import {RPUserEntity} from './user/user.entity';
import {RPRankRepository} from './rank/rank.repository';
import {RPUserRepository} from './user/user.repository';
import {RankRepository, UserRepository} from '@instinct-api/database';
import {LawEntity} from './law/law.entity';
import {LawVoteEntity} from './law/law-vote.entity';
import {LawCommentEntity} from './law/law-comment.entity';
import {LawRepository} from './law/law.repository';
import {LawEventEntity} from './law/law-event.entity';
import {LawEventRepository} from './law/law-event.repository';
import {LawVoteRepository} from './law/law-vote.repository';
import {PoliticalPartyEntity} from './political-party/political-party.entity';
import {PoliticalPartyMemberEntity} from './political-party/political-party-member.entity';
import {PoliticalPartyRepository} from './political-party/political-party.repository';
import {PoliticalPartyMemberRepository} from './political-party/political-party-member.repository';
import {GuideEntity} from './guide/guide.entity';
import {GuideCategoryEntity} from './guide/guide-category.entity';
import {GuideReactionEntity} from './guide/guide-reaction.entity';
import {GuideRepository} from './guide/guide.repository';
import {GuideCategoryRepository} from './guide/guide-category.repository';
import {GuideReactionRepository} from './guide/guide-reaction.repository';
import {FoodEntity} from './food/food.entity';
import {FoodRepository} from './food/food.repository';

export const rpDatabaseEntities: Function[] = [
  GangEntity,
  GangRankEntity,
  BusinessEntity,
  UserRPStatEntity,
  BusinessPositionEntity,
  RPRankEntity,
  RPUserEntity,
  LawEntity,
  LawEventEntity,
  LawVoteEntity,
  GuideEntity,
  GuideCategoryEntity,
  GuideReactionEntity,
  LawCommentEntity,
  PoliticalPartyEntity,
  PoliticalPartyMemberEntity,
  FoodEntity,
];

export const rpDatabaseProviders: Provider[] = [
  LawEventRepository,
  LawVoteRepository,
  LawRepository,
  GangRepository,
  GuideRepository,
  GuideCategoryRepository,
  GuideReactionRepository,
  GangRankRepository,
  BusinessRepository,
  UserRPStatRepository,
  BusinessPositionRepository,
  PoliticalPartyRepository,
  FoodRepository,
  PoliticalPartyMemberRepository,
  RPUserRepository, // Ensure rp services can be type protected
  RPRankRepository, // Ensure rp services can be type protected
  {
    provide: UserRepository,
    useClass: RPUserRepository, // Ensure core services provide rp data
  },
  {
    provide: RankRepository,
    useClass: RPRankRepository, // Ensure core services provide rp data
  },
];
