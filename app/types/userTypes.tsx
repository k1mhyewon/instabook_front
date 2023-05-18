import { FollowType, FollowWithUserType } from "./followType";

export type UserTypes = {
  id: number;
  userName: string;
  password: string;
  name: string;
  userInfo: string;
  profilePhoto: string;
};

export type UserWithFollowType = {
  id?: number;
  userName?: string;
  password?: string;
  name?: string;
  userInfo?: string;
  profilePhoto?: string;
  followFrom: FollowWithUserType[];
  followTo: FollowWithUserType[];
};
