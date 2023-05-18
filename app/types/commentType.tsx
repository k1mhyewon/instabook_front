import { CommentLikeType } from "./commentLikeType";
import { UserTypes } from "./userTypes";

export type CommentType = {
  id: string;
  userId: string;
  postId: string;
  content: string;
  uploadDate: string;
  likes: CommentLikeType[];
};

export type CommentWithUserInfoType = {
  id: string;
  userId: string;
  postId: string;
  content: string;
  uploadDate: string;
  likes: CommentLikeType[];
  user: UserTypes;
};
