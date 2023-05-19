"use client";

import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { ReplyOne } from "./replyOne";
import { CommentWithUserInfoType } from "../types/commentType";
import { UserContext } from "../userContextProvider";
import axios from "axios";

type PostReplyProps = {
  commentArr: CommentWithUserInfoType[] | undefined;
  postId: string;
};

export const ReplyUserTitle = (props: PostReplyProps) => {
  const usercontext = useContext<number | null>(UserContext);
  const userId: number | undefined = usercontext ?? undefined;

  const [inputValue, setInputValue] = useState("");
  const [commentArr, setCommentArr] = useState<CommentWithUserInfoType[]>(
    props.commentArr ?? []
  );

  useEffect(() => {}, [commentArr]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    type FormData = {
      [key: string]: string | File;
    };
    // FormData 객체에 저장된 값을 출력
    let json: FormData = {};
    for (let [key, value] of formData.entries()) {
      json[key] = value;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/comment/write",
        json,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("댓글달기 성공");
      const newData: CommentWithUserInfoType = response.data;

      // 기존 댓글 배열에 새로운 댓글 추가
      setCommentArr([...commentArr, newData]);
      setInputValue(""); // 입력 필드 초기화
    } catch (error) {
      alert("댓글달기 실패");
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-h-[260px] overflow-y-auto">
        {commentArr?.map((comment, i) => (
          <>
            <ReplyOne key={comment.id} commentInfo={comment} />
          </>
        ))}
      </div>
      <form action={"/api/comment/write"} method="post" onSubmit={handleSubmit}>
        <div className="flex items-row">
          <div className="mt-4 ml-2">
            <Image
              src={userimg}
              alt="user"
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>
          <input
            type="text"
            placeholder=""
            name="content"
            className="py-1.5 border border-gray-300 rounded-lg mb-4 mt-4 ml-3 w-10/12 "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="ml-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-rose-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </button>
          <input type="hidden" name="postId" value={props.postId} />
          <input type="hidden" name="userId" value={userId} />
        </div>
      </form>
    </>
  );
};
