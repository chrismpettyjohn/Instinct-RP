import {Gang} from '@instinct-plugin/roleplay-types';

export interface GangService {
  getAll(): Promise<Gang[]>;
  getByID(gangID: string): Promise<Gang>;
}
