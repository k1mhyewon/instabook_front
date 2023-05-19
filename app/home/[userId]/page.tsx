"use client";

import { UserPost } from "@/app/profile/userPost";
import { PostType } from "@/app/types/postTypes";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useContext, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function UserHome({ params: { userId } }: Params) {
  // const [userInfo, setUserInfo] = useState<UserWithFollowType | undefined>();
  const [userPosts, setUserPosts] = useState<PostType[] | undefined>();

  useEffect(() => {
    const sessionData = localStorage.getItem("access_token");
    if (userId === null && sessionData) {
      const token = JSON.parse(sessionData);
      if (typeof window !== "undefined" && token) {
        console.log(token);
        if (token) {
          axios
            .get("http://localhost:3000/api/getUserInfo", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              // userId = response.data.sub;
              const { sub } = response.data;
              setUserPosts(sub);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    }
  }, []);

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
    if (userId !== null) {
      getUserPosts();
    }
  }, [userId]);

  return (
    <>
      <div className="max-h-[725px] overflow-y-auto">
        <UserPost userPosts={userPosts} />
      </div>
    </>
  );
}
