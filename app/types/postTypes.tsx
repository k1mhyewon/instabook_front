import { CommentType, CommentWithUserInfoType } from "./commentType";
import { PostLikeType } from "./postLikeType";
import { UserTypes } from "./userTypes";

export type PostType = {
  id: string;
  userId: string;
  content: string;
  uploadDate: string;
  postPhoto: string;
  viewCount: string;
  likes: PostLikeType[];
  comments: CommentWithUserInfoType[];
  user: UserTypes;
};

export type PostTypeWithTags = {
  postId: string;
  tagName: string;
  post: PostType;
};
