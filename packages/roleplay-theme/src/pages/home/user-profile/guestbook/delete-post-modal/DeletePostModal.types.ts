import {UserGuestbookPost} from '@instinct-prj/interface';

export interface DeletePostModalProps {
  post: UserGuestbookPost;
  onDeletion(postID: number): void;
}
