"use client";

import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserTypes } from "../types/userTypes";
import { CommentLikeType } from "../types/commentLikeType";
import { CommentWithUserInfoType } from "../types/commentType";

type ReplyOneProps = {
  commentInfo: CommentWithUserInfoType;
  // key: number;
};

export const ReplyOne = (props: ReplyOneProps) => {
  // const [replyInputs, setReplyInputs] = useState(
  //   // 초기값으로 각 댓글의 showInput 상태를 false로 설정
  //   new Array(2).fill(false)
  // );

  // const handleReplyInputClick = (index: number) => {
  //   // index에 해당하는 댓글의 showInput 상태를 toggle
  //   setReplyInputs((inputs) => {
  //     const newInputs = inputs.map(() => false);
  //     newInputs[index] = true;
  //     return newInputs;
  //   });
  // };

  // const [isFilled, setIsFilled] = useState(new Array(2).fill(false));

  // const handleClick = (index: number) => {
  //   setIsFilled((likesInputs) => {
  //     const newLikesInputs = likesInputs.map(() => false);
  //     newLikesInputs[index] = true;
  //     return newLikesInputs;
  //   });
  // };

  return (
    <>
      <div className="ml-2 mt-3 flex items-center">
        <div className="mr-2">
          <Image
            src={userimg}
            alt="user"
            className="w-8 h-8 object-cover rounded-full"
          />
        </div>
        <div className="mb-2">
          <div className="flex items-row">
            <Link href={`/profile/${props.commentInfo?.user.id}`}>
              <div className="text-xs font-bold">
                {props.commentInfo?.user.userName}
              </div>
            </Link>
            <div className="text-xs justify-end">
              {props.commentInfo?.uploadDate}
            </div>
          </div>
          <div className="flex items-row">
            <div className="flex-1 ">{props.commentInfo?.content}</div>
            <div
              className="flex justify-end mr-4 ml-2 items-center"
              // onClick={() => handleClick(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // fill={isFilled ? "red" : "none"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-red-600 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-row mt-1">
            <Link href="/like">
              <div className="flex mr-2">
                <p className="text-xs text-slate-600 ml-1">
                  {props.commentInfo?.likes.length}
                </p>
                <p className="text-xs text-slate-600 ml-1">like</p>
              </div>
            </Link>
            {/* <div
              className="text-xs text-slate-600"
              // onClick={() => handleReplyInputClick(1)}
            >
              reply
            </div> */}
          </div>
        </div>
      </div>
      {/* {replyInputs[1] && (
        <div className="flex justify-center mt-3">
          <div className="text-gray-400 ml-4 text-xl pt-1">{"|"}</div>
          <input
            type="text"
            placeholder=""
            className="py-1 border border-gray-300 rounded-lg mb-4 ml-4 w-9/12 "
          />
        </div>
      )} */}
    </>
  );
};
// function setIsFilled(arg0: (prevState: any) => boolean) {
//   throw new Error("Function not implemented.");
// }
