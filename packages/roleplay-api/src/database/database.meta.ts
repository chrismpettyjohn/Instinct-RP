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
import {GamblingMachineEntity} from './gambling-machine/gambling.entity';
import {GamblingMachineRepository} from './gambling-machine/gambling.repository';
import {WeaponEntity} from './weapon/weapon.entity';
import {WeaponRepository} from './weapon/weapon.repository';
import {VendingMachineEntity} from './vending-machine/vending-machine.entity';
import {VendingMachineRepository} from './vending-machine/vending-machine.repository';
import {CrimeEntity} from './crime/crime.entity';
import {CrimeRepository} from './crime/crime.repository';
import {RPRoomEntity} from './room/rp-room.entity';
import {RPRoomRepository} from './room/rp-room.repository';
import {BountyEntity} from './bounty/bounty.entity';
import {BountyRepository} from './bounty/bounty.repository';
import {PropertyEntity} from './property/properties/property.entity';
import {PropertyPhotoEntity} from './property/property-photos/property-photo.entity';
import {PropertyBidsEntity} from './property/property-bids/property-bids.entity';
import {PropertyPhotosRepository} from './property/property-photos/property-photos.repository';
import {PropertyBidsRepository} from './property/property-bids/property-bids.repository';
import {PropertyRepository} from './property/properties/property.repository';

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
  BountyEntity,
  GuideEntity,
  GuideCategoryEntity,
  GuideReactionEntity,
  RPRoomEntity,
  LawCommentEntity,
  PoliticalPartyEntity,
  GamblingMachineEntity,
  PoliticalPartyMemberEntity,
  FoodEntity,
  WeaponEntity,
  VendingMachineEntity,
  CrimeEntity,
  PropertyEntity,
  PropertyBidsEntity,
  PropertyPhotoEntity,
];

export const rpDatabaseProviders: Provider[] = [
  LawEventRepository,
  LawVoteRepository,
  LawRepository,
  GangRepository,
  GuideRepository,
  RPRoomRepository,
  GuideCategoryRepository,
  GuideReactionRepository,
  GangRankRepository,
  BusinessRepository,
  UserRPStatRepository,
  GamblingMachineRepository,
  BusinessPositionRepository,
  PoliticalPartyRepository,
  CrimeRepository,
  FoodRepository,
  VendingMachineRepository,
  BountyRepository,
  WeaponRepository,
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
  PropertyPhotosRepository,
  PropertyBidsRepository,
  PropertyRepository,
];
