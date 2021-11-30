import {GuideDTO} from '@instinct-plugin/roleplay-types';

export interface GuideEditorProps {
  baseGuideDTO?: GuideDTO;
  onSubmit(newGuideDTO: GuideDTO): Promise<void>;
}
