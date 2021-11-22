import {GangPipe} from './gang.pipe';
import {GangService} from './gang.service';
import {Controller, Get, Param} from '@nestjs/common';
import {Gang, RPUser} from '@instinct-plugin/roleplay-types';
import {GangEntity, GangRepository, gangWire} from '../database/gang';
import {HasSession} from '@instinct-api/session';

@Controller('gangs')
@HasSession()
export class GangController {
  constructor(
    private readonly gangRepo: GangRepository,
    private readonly gangService: GangService
  ) {}

  @Get()
  async getGangs(): Promise<Gang[]> {
    const gangs = await this.gangRepo.find();
    const gangMembers: Array<RPUser[]> = [];

    const fetchMembersForGang = async (gang: GangEntity) => {
      const members = await this.gangService.getUsersInGang(gang);
      gangMembers.push([...members]);
    };

    await Promise.all(gangs.map(gangID => fetchMembersForGang(gangID)));

    return gangs.map((gang, index) => gangWire(gang, gangMembers[index]));
  }

  @Get(':gangID')
  async getGangByID(
    @Param('gangID', GangPipe) gang: GangEntity
  ): Promise<Gang> {
    const gangMembers = await this.gangService.getUsersInGang(gang);
    return gangWire(gang, gangMembers);
  }
}
