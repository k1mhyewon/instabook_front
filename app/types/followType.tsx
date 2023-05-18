import { UserTypes, UserWithFollowType } from "./userTypes";

export type FollowType = {
  followFrom: string;
  followTo: string;
};

export type FollowWithUserType = {
  followFrom: string;
  followTo: string;
  userFollowTo: UserWithFollowType;
  userFollowFrom: UserWithFollowType;
};
