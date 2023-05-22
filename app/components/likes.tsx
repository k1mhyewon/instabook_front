"use client";
import Link from "next/link";
import { PostType } from "../types/postTypes";
import { UserContext } from "../userContextProvider";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

type LikesProps = {
  post: PostType;
};

export const Likes = (props: LikesProps) => {
  // const userId = useContext<number | null>(UserContext);
  const [userId, setUserId] = useState<number>(0);

  const fetchUserData = async () => {
    try {
      const sessionData = sessionStorage.getItem("access-token") ?? null;

      if (typeof window !== "undefined" && sessionData) {
        const token = JSON.parse(sessionData);
        console.log(token);
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/getUserInfo",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userId = response.data.sub;
          setUserId(userId);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [likeBool, setLikeBool] = useState(false);
  const [likeCnt, setLikeCnt] = useState(props.post.likes.length);

  const getPostLikeBool = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/likes/userLike/${userId}/${props.post.id}`,
        {}
      );
      setLikeBool(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const goLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/likes/goLike/${userId}/${props.post.id}`,
        {}
      );
      setLikeBool(!likeBool);
      setLikeCnt(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostLikeBool();
  }, []);

  return (
    <>
      <div className="flex mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={likeBool ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-red-600 mr-1"
          onClick={goLike}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <Link href="/like">
          <p>{likeCnt}</p>
        </Link>
      </div>
    </>
  );
};
