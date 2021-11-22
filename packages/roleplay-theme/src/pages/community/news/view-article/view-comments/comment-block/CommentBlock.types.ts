import {ArticleComment} from '@instinct-prj/interface';

export interface CommentBlockProps {
  comment: ArticleComment;
  onChange(): void;
}
