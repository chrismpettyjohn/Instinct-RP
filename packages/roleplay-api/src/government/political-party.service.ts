import {Injectable} from '@nestjs/common';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {RPUser} from '@instinct-plugin/roleplay-types';
import {RPUserEntityStruct} from '../database/user/user.types';
import {PoliticalPartyEntity} from '../database/political-party/political-party.entity';

@Injectable()
export class PoliticalPartyService {
  constructor(private readonly rpUserService: RPUserService) {}

  async getUsersForPoliticalParty(
    politicalParty: PoliticalPartyEntity
  ): Promise<RPUser[]> {
    const usersToFetch: RPUserEntityStruct[] = politicalParty.members!.map(
      member => {
        return {
          ...member.user!.user!,
          rank: member.user!.user!.rank,
          rpStats: member.user!,
        };
      }
    );

    const fetchRPUser = async (user: RPUserEntityStruct): Promise<RPUser> => {
      const rpStats = await this.rpUserService.getRPStatsForUser(user);
      return rpUserWire(user, rpStats);
    };

    return Promise.all(usersToFetch.map(fetchRPUser));
  }
}
