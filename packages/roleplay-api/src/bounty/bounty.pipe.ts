import {BountyEntity} from '../database/bounty/bounty.entity';
import {BountyRepository} from '../database/bounty/bounty.repository';
import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class BountyPipe implements PipeTransform {
  constructor(private readonly bountyRepo: BountyRepository) {}

  async transform(bountyID: number): Promise<BountyEntity> {
    try {
      return await this.bountyRepo.findOneOrFail({id: bountyID});
    } catch (e) {
      throw new NotFoundException('Bounty does not exist');
    }
  }
}
