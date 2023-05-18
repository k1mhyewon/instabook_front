"use client";

import Image from "next/image";
import userimg from "../../public/images/user.jpg";
import { useContext } from "react";
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

  // const [showLike, setShowLike] = useState(false);

  // const handleLikeClick = () => {
  //   setShowLike(!showLike);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 폼 데이터 수집

    const formData = new FormData(e.currentTarget);
    interface FormData {
      [key: string]: string | File;
    }
    // FormData 객체에 저장된 값을 출력
    let json: FormData = {};
    for (let [key, value] of formData.entries()) {
      console.log(key, value, typeof value);
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
      console.log(response.data);

      // router.push("/");
      alert("댓글달기 성공");
    } catch (error) {
      alert("댓글달기 실패");
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-h-[260px] overflow-y-auto">
        {props.commentArr?.map((comment, i) => (
          <>
            <ReplyOne commentInfo={comment} />
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
          />
          <input type="hidden" name="postId" value={props.postId} />
          <input type="hidden" name="userId" value={userId} />
        </div>
        <button type="submit" className="w-10 h-10 bg-yellow-200"></button>
      </form>
    </>
  );
};
