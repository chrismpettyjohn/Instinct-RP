import {PipeTransform, Injectable, NotFoundException} from '@nestjs/common';
import {PoliticalPartyEntity} from '../database/political-party/political-party.entity';
import {PoliticalPartyRepository} from '../database/political-party/political-party.repository';

@Injectable()
export class PoliticalPartyPipe implements PipeTransform {
  constructor(private readonly politicalPartyRepo: PoliticalPartyRepository) {}

  async transform(politicalPartyID: number): Promise<PoliticalPartyEntity> {
    try {
      return await this.politicalPartyRepo.findOneOrFail({
        id: politicalPartyID,
      });
    } catch (e) {
      throw new NotFoundException('Political Party does not exist');
    }
  }
}
