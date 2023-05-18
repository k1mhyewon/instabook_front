"use client";
import axios from "axios";
import { HomeUserTitle } from "../home/homeUserTitle";
import { UserPost } from "../profile/userPost";
import { useEffect, useState } from "react";
import { PostType, PostTypeWithTags } from "../types/postTypes";

type SearchInputProps = {
  tagName: string;
};
export const SearchInput = (props: SearchInputProps) => {
  const [userPosts, setUserPosts] = useState<PostType[] | undefined>();

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/search/${props.tagName}`,
        {}
      );
      const posts: PostType[] = response.data.map(
        (item: PostTypeWithTags) => item.post
      );
      setUserPosts(posts);
      console.log(response.data);
    } catch (error) {
      alert("/post/tags/  실패");
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="mx-auto py-8 px-4 ">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-orange-200 rounded-lg hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <div className="mt-8 mb-4 max-h-[725px] overflow-y-auto">
          {/* <UserPost userPosts={userPosts} /> */}
        </div>
      </div>
    </>
  );
};

/*
<form className="flex flex-row h-10">
          <input
            type="text"
            placeholder=""
            className="border border-gray-300 rounded-lg w-10/12 mr-2"
          />
          <button
            type="submit"
            className="bg-zinc-400 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-fit "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
*/
