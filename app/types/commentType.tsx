import { CommentLikeType } from "./commentLikeType";

export type CommentType = {
  id: string;
  userId: string;
  postId: string;
  content: string;
  uploadDate: string;
  likes: CommentLikeType[];
};
