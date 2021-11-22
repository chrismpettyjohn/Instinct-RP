import {Injectable} from '@nestjs/common';
import {UserRPStats} from '@instinct-plugin/roleplay-types';
import {RPUserEntityStruct} from '../database/user/user.types';
import {GangRankRepository, GangRepository} from '../database/gang';
import {BusinessRepository} from '../database/business/business.repository';
import {parseBusinessData, parseGangData, rpStatsWire} from '../database/user';
import {BusinessPositionRepository} from '../database/business/business-position.repository';

@Injectable()
export class RPUserService {
  constructor(
    private readonly jobRepo: BusinessRepository,
    private readonly jobPositionRepo: BusinessPositionRepository,
    private readonly gangRepo: GangRepository,
    private readonly gangPositionRepo: GangRankRepository
  ) {}

  async getRPStatsForUser(user: RPUserEntityStruct): Promise<UserRPStats> {
    const jobData = parseBusinessData(user.rpStats!.jobData);
    const [jobEmployer, jobPosition] =
      jobData.jobID && jobData.jobRankID
        ? await Promise.all([
            this.jobRepo.findOneOrFail({id: jobData.jobID}),
            this.jobPositionRepo.findOneOrFail({
              jobID: jobData.jobID,
              jobRankID: jobData.jobRankID,
            }),
          ])
        : [undefined, undefined];

    const gangData = parseGangData(user.rpStats!.gangData);
    const [gangAllegiance, gangPosition] =
      gangData.gangID && gangData.gangRankID
        ? await Promise.all([
            this.gangRepo.findOneOrFail({id: gangData.gangID}),
            this.gangPositionRepo.findOneOrFail({
              gangID: gangData.gangID,
              gangRankID: gangData.gangRankID,
            }),
          ])
        : [undefined, undefined];

    return rpStatsWire(
      user.rpStats!,
      gangAllegiance,
      gangPosition,
      jobEmployer,
      jobPosition
    );
  }
}
