"use client";

import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import { useState } from "react";
import Link from "next/link";
import { ReplyOne } from "./replyOne";

export const ReplyUserTitle = () => {
  const [replyInputs, setReplyInputs] = useState(
    // 초기값으로 각 댓글의 showInput 상태를 false로 설정
    new Array(2).fill(false)
  );

  const handleReplyInputClick = (index: number) => {
    // index에 해당하는 댓글의 showInput 상태를 toggle
    setReplyInputs((inputs) => {
      const newInputs = inputs.map(() => false);
      newInputs[index] = true;
      return newInputs;
    });
  };

  const [showLike, setShowLike] = useState(false);

  const handleLikeClick = () => {
    setShowLike(!showLike);
  };

  return (
    <>
      <div className="max-h-[300px] overflow-y-auto">
        <ReplyOne />
        <ReplyOne />
        <ReplyOne />
      </div>

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
          className="py-1.5 border border-gray-300 rounded-lg mb-4 mt-4 ml-3 w-10/12 "
        />
      </div>
    </>
  );
};
