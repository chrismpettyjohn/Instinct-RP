import {BusinessDTO} from '@instinct-plugin/roleplay-types';

export interface BusinessEditorProps {
  defaultBusiness?: BusinessDTO;
  editorOnly: boolean;
  onSubmit(business: BusinessDTO): void | Promise<void>;
}
