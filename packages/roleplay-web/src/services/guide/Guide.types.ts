import {Guide, GuideDTO, GuideReaction} from '@instinct-plugin/roleplay-types';

export interface GuideService {
  getAll(): Promise<Guide[]>;
  create(guideDTO: GuideDTO): Promise<Guide>;
  getByID(guideID: string): Promise<Guide>;
  updateByID(guideID: string, guideDTO: GuideDTO): Promise<void>;
  deleteByID(guideID: string): Promise<void>;
  reactByID(guideID: string, reaction: GuideReaction): Promise<void>;
}
