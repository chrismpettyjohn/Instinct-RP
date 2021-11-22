import {UserGuestbookPost} from '@instinct-prj/interface';

export interface CreatePostModalProps {
  profileID: number;
  onCreation(post: UserGuestbookPost): void;
}
