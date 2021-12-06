import {RankService} from './rank.service';
import {Controller, Get} from '@nestjs/common';
import {HasSession} from '@instinct-api/session';
import {RPRank} from '@instinct-plugin/roleplay-types';
import {PermissionStatus} from '@instinct-api/database';
import {RPRankRepository} from '../database/rank/rank.repository';

@Controller('rp-ranks')
@HasSession()
export class RankController {
  constructor(
    private readonly rankRepo: RPRankRepository,
    private readonly rankService: RankService
  ) {}

  @Get('staff')
  async getStaffRanks(): Promise<RPRank[]> {
    const staffRanks = await this.rankRepo.find({
      websiteShowStaff: PermissionStatus.Enabled,
    });

    const staffWires: RPRank[] = [];

    for (const staffRank of staffRanks) {
      const wire = await this.rankService.getWireForRank(staffRank);
      staffWires.push(wire);
    }

    return staffWires.reverse();
  }
}
