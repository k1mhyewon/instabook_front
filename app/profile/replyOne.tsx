"use client";

import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserTypes } from "../types/userTypes";
import { CommentLikeType } from "../types/commentLikeType";
import { CommentWithUserInfoType } from "../types/commentType";
import { UserContext } from "../userContextProvider";

type ReplyOneProps = {
  commentInfo: CommentWithUserInfoType;
};

export const ReplyOne = (props: ReplyOneProps) => {
  const userId = useContext<number | null>(UserContext);

  const [likeBool, setLikeBool] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);

  const getCommentLikeBool = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comment/likes/userLike/${userId}/${props.commentInfo.id}`,
        {}
      );
      setLikeBool(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    interface FormData {
      [key: string]: string | File;
    }
    // FormData 객체에 저장된 값을 출력
    let json: FormData = {};
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
      json[key] = value;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/comment/likes/goLike`,
        json,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLikeBool(!likeBool);
      setLikeCnt(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommentLikeBool();
    setLikeCnt(props.commentInfo?.likes.length);
  }, []);

  return (
    <>
      <div className="ml-2 mt-3 flex items-center">
        <div className="mr-2">
          {props.commentInfo.user.profilePhoto ? (
            <>
              <Image
                src={require(`../../public/images/${props.commentInfo.user.profilePhoto}`)}
                alt="user"
                className="w-8 h-8 object-cover rounded-full"
                width={30}
                height={30}
              />
            </>
          ) : (
            <>
              <Image
                src={require("../../public/images/userProfile.png")}
                alt="user"
                className="w-8 h-8 object-cover rounded-full"
                width={30}
                height={30}
              />
            </>
          )}
        </div>
        <div className="mb-2">
          <div className="flex items-row">
            <Link href={`/profile/${props.commentInfo?.user.id}`}>
              <div className="text-xs font-bold mr-2">
                {props.commentInfo?.user.userName}
              </div>
            </Link>
            <div className="text-xs justify-end">
              {props.commentInfo?.uploadDate}
            </div>
          </div>
          <div className="flex items-row">
            <div className="flex-1 text-sm">{props.commentInfo?.content}</div>
            <div className="flex justify-end mr-4 ml-2 items-center">
              <form
                action={"/api/comment/likes/goLike"}
                method="post"
                onSubmit={handleSubmit}
              >
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={likeBool ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-red-600 "
                    // onClick={goLike}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>

                <input type="hidden" name="userId" value={userId!} />
                <input type="hidden" name="id" value={props.commentInfo?.id} />
              </form>
            </div>
          </div>
          <div className="flex flex-row mt-1">
            <Link href="/like">
              <div className="flex mr-2">
                <p className="text-xs text-slate-600 ml-1">{likeCnt}</p>
                <p className="text-xs text-slate-600 ml-1">like</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
