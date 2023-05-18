"use client";

import { UserPost } from "@/app/profile/userPost";
import { PostType } from "@/app/types/postTypes";
import { UserWithFollowType } from "@/app/types/userTypes";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function UserHome({ params: { userId } }: Params) {
  // const [userInfo, setUserInfo] = useState<UserWithFollowType | undefined>();
  const [userPosts, setUserPosts] = useState<PostType[] | undefined>();

  const getUserPosts = () =>
    axios
      .get(`http://localhost:3000/api/home/${userId}`, {})
      .then((response) => {
        console.log(response.data);
        setUserPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <>
      <div className="max-h-[725px] overflow-y-auto">
        <UserPost userPosts={userPosts} />
      </div>
    </>
  );
}
