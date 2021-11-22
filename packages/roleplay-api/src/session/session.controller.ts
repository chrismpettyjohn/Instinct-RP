import {Controller, Get} from '@nestjs/common';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {RPUser} from '@instinct-plugin/roleplay-types';
import {GetSession, HasSession} from '@instinct-api/session';
import {RPUserEntityStruct} from '../database/user/user.types';
import {RPUserRepository} from '../database/user/user.repository';

@Controller('session')
export class SessionController {
  constructor(
    private readonly rpUserService: RPUserService,
    private readonly rpUserRepo: RPUserRepository
  ) {}

  @Get('rp')
  @HasSession()
  async getSession(@GetSession() session: RPUserEntityStruct): Promise<RPUser> {
    const rpUser = await this.rpUserRepo.findOneOrFail({id: session.id});
    const rpStats = await this.rpUserService.getRPStatsForUser(rpUser);
    return rpUserWire(rpUser, rpStats);
  }
}
