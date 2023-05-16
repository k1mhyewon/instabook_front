"use client";

import { error } from "console";
import { Profile } from "../profile";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserPost } from "../userPost";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { UserContext } from "@/app/userContextProvider";
import { UserTypes } from "@/app/types/userTypes";
import { PostType } from "@/app/types/postTypes";

export default function ProfileHome({ params: { userId } }: Params) {
  const usercontext = useContext<number | null>(UserContext);
  const userId2 = usercontext ?? "";

  const [userInfo, setUserInfo] = useState<UserTypes | undefined>();
  const [userPosts, setUserPosts] = useState<PostType[] | undefined>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/profile/${userId}`, {})
      .then((response) => {
        const resUserInfo = response.data;
        setUserInfo(resUserInfo);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:3000/api/profile/${userId}/posts`, {})
      .then((response) => {
        const resUserPosts = response.data;
        setUserPosts(resUserPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(userInfo);
  console.log(userPosts);

  return (
    <>
      <Profile userInfo={userInfo} />
      <div className="max-h-[526px] overflow-y-auto">
        {/* {userId} */}
        <UserPost
          userPosts={userPosts}
          userName={userInfo?.userName}
          profilePhoto={userInfo?.profilePhoto}
        />
      </div>
    </>
  );
}
