import Moment from 'moment';
import {Injectable} from '@nestjs/common';
import {RPUser} from '@instinct-plugin/roleplay-types';
import {RPUserEntityStruct} from '../database/user/user.types';
import {uniqBy} from 'lodash';
import {LawRepository} from '../database/law/law.repository';
import {RPUserService} from '../user/user.service';
import {LawEntity} from '../database/law/law.entity';
import {rpUserWire} from '../database/user/user.wire';
import {LawEventRepository} from '../database/law/law-event.repository';

@Injectable()
export class LawService {
  constructor(
    private readonly lawRepo: LawRepository,
    private readonly rpUserService: RPUserService,
    private readonly lawEventRepo: LawEventRepository
  ) {}

  async getUsersForLaw(law: LawEntity): Promise<RPUser[]> {
    const usersToFetch: RPUserEntityStruct[] = [
      law.user!,
      ...law.votes!.map(lawVote => lawVote.user!),
      ...law.comments!.map(lawComment => lawComment.user!),
    ];

    const uniqueUsersToFetch = uniqBy(usersToFetch, 'id');

    const fetchRPUser = async (user: RPUserEntityStruct): Promise<RPUser> => {
      const rpStats = await this.rpUserService.getRPStatsForUser(user);
      return rpUserWire(user, rpStats);
    };

    return Promise.all(uniqueUsersToFetch.map(fetchRPUser));
  }

  async registerEvent(lawID: number, event: string): Promise<void> {
    await this.lawEventRepo.create({
      lawID,
      event,
      timestamp: Moment().unix(),
    });
  }
}
