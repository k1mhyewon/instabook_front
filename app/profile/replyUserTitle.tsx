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
          <ReplyOne key={comment.id} commentInfo={comment} />
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
              className="w-7 h-7 text-purple-400 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
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
