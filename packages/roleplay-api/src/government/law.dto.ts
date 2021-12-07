import {IsString} from 'class-validator';
import {
  LawDTO,
  LawPresidentialDecisionDTO,
} from '@instinct-plugin/roleplay-types';

export class LawDTOImplementation implements LawDTO {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  content!: string;
}

export class LawPresidentialDecisionDTOImplementation
  implements LawPresidentialDecisionDTO
{
  @IsString()
  decision!: 'approved' | 'rejected';
}
