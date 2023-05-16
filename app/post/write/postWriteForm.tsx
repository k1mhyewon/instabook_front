"use client";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/app/userContextProvider";
import { useRouter } from "next/navigation";

export const PostWriteForm = () => {
  const router = useRouter();

  // 파일업로드
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const content = useRef("");
  const usercontext = useContext<number | null>(UserContext);
  const userId = usercontext ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // if (selectedFile) {
    //   formData.append("profilePhoto", selectedFile);
    // }

    type FormData = {
      [key: string]: string | File | number;
    };

    let json: FormData = {};
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
      json[key] = value;
    }

    try {
      await axios.post("http://localhost:3000/api/post/write", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/");
      alert("포스팅 성공");
    } catch (error) {
      alert("포스팅 실패");
      console.error(error);
    }
  };

  return (
    <>
      <form action={"/api/post/write"} method="post" onSubmit={handleSubmit}>
        <div className="w-full mt-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
              <div className="flex items-center space-x-1 sm:pr-4">
                <button
                  type="button"
                  className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Add emoji</span>
                </button>
              </div>
              <div>{/* <EmojiPicker /> */}</div>

              <div className="flex flex-wrap items-center space-x-1 sm:pl-4"></div>
            </div>
          </div>

          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <label htmlFor="content" className="sr-only">
              Publish post
            </label>
            <textarea
              id="content"
              className="block w-full h-28 px-0 resize text text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="100글자 이내로 작성해주세요"
              required
              name="content"
              onChange={(e) => {
                content.current = e.target.value;
              }}
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="profilePhoto"
              className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="profilePhoto"
                type="file"
                className="hidden"
                name="profilePhoto"
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }}
              />
            </label>
            {selectedImage ? (
              <img src={selectedImage} alt="" className="w-20 h-30" />
            ) : (
              <div></div>
            )}
          </div>
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <textarea
              id="chat"
              className="block h-8 w-full text text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" #"
            />
            <div className="mt-3">
              <a className="underline mr-4">#ig</a>
              <a className="underline mr-4">#danbi</a>
            </div>
          </div>
        </div>

        <div>
          <input type="hidden" value={userId} name="userId" readOnly />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex mr-4 items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-orange-300 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-orange-300"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

{
  /* <button
                  type="button"
                  className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Upload image</span>
                </button> */
}
