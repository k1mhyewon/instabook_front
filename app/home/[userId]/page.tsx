"use client";

import { UserPost } from "@/app/profile/userPost";
import { PostType } from "@/app/types/postTypes";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useContext, useEffect, useRef, useState } from "react";

export default function UserHome({ params: { userId } }: Params) {
  // const [userInfo, setUserInfo] = useState<UserWithFollowType | undefined>();
  const [userPosts, setUserPosts] = useState<PostType[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  // const [localUserId, setLocalUserId] = useState("");
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sessionData = localStorage.getItem("access_token");

    if (userId === null && sessionData) {
      const token = JSON.parse(sessionData);
      if (typeof window !== "undefined" && token) {
        console.log(token);
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
  }, []);

  const getUserPosts = (pageNumber: number) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/home/${userId}?page=${pageNumber}`, {})
      .then((response) => {
        console.log(response.data);
        setUserPosts((prevPosts) =>
          prevPosts ? [...prevPosts, ...response.data] : response.data
        );

        // 페이지가 더 이상 없을 경우 로딩 상태를 해제합니다.
        if (response.data.length === 0) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
      setIsLoading(true); // 로딩 상태 설정
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (userId !== null) {
      getUserPosts(page);
    }
  }, [userId, page]);

  return (
    <>
      <div className="max-h-[725px] overflow-y-auto" ref={containerRef}>
        <UserPost userPosts={userPosts} />
      </div>
    </>
  );
}
