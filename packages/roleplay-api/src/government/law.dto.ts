import {IsString} from 'class-validator';
import {LawDTO} from '@instinct-plugin/roleplay-types';

export class LawDTOImplementation implements LawDTO {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  content!: string;
}
