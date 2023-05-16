import { CommentType } from "./commentType";
import { PostLikeType } from "./postLikeType";

export type PostType = {
  id: number;
  userId: number;
  content: string;
  uploadDate: Date;
  postPhoto: string;
  viewCount: number;
  likes: PostLikeType[];
  comments: CommentType[];
};
