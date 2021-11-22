import {Law} from '@instinct-plugin/roleplay-types';

export interface LawActionsProps {
  law: Law;
  onChange(): void;
}
