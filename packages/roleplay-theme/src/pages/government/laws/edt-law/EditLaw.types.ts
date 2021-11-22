import {LawDTO} from '@instinct-plugin/roleplay-types';

export interface EditLawProps {
  baseLawDTO?: LawDTO;
  onSubmit(newLawDTO: LawDTO): Promise<void>;
}
