"use client";

import Image from "next/image";
import postimg from "../../public/images/userProfile/postpic.jpg";
import { PostReply } from "./postReply";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HomeUserTitle } from "../home/homeUserTitle";
import axios from "axios";
import { UserPostContent } from "./components/userPostContent";
import { PostType } from "../types/postTypes";
import { UserWithFollowType } from "../types/userTypes";
import { Likes } from "../components/likes";
import { PostTags } from "../components/postTags";

type PostProps = {
  userPosts: PostType[] | undefined;
  userInfo?: UserWithFollowType | undefined;
};

export const UserPost = (props: PostProps) => {
  const [showReply, setShowReply] = useState(false);

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  return (
    <>
      {props.userPosts?.map((post, i) => (
        <div key={i}>
          <HomeUserTitle
            userName={post.user.userName}
            userId={post.user.id}
            profilePhoto={post.user.profilePhoto}
          />
          <div>
            <div className="flex flex-col mt-4 mb-2">
              <UserPostContent content={post.content} />

              <div className="w-full mt-4 flex justify-center">
                <div className="mr-4 w-32 h-40">
                  <Image src={postimg} alt="user" className="object-fill" />
                </div>
              </div>
              <PostTags postId={post.id} />

              <div className="flex flex-row text-sm mt-4 ml-4">
                <Likes post={post} />

                <div className="flex " onClick={handleReplyClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  <p>{post.comments.length}</p>
                </div>

                <div className="flex ml-auto">
                  <Link href={`/post/edit/${post.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="flex ml-1 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 ml-5 mb-2">
              {post.uploadDate}
            </div>
            {showReply && (
              <PostReply commentArr={post.comments} postId={post.id} />
            )}

            <hr />
          </div>
        </div>
      ))}
    </>
  );
};
