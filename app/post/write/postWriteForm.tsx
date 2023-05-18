"use client";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "@/app/userContextProvider";
import { useRouter } from "next/navigation";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { TagifyComponent } from "@/app/components/tagify";
import Tagify from "@yaireo/tagify";
import { FileInput } from "./conponents/fileInput";

export const PostWriteForm = () => {
  const router = useRouter();

  // emoji picker
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputStr, setInputStr] = useState("");

  // tag
  const [tagValues, setTagValues] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(tagValues);
  }, [tagValues]);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onEmojiClick = (e: any, emojiObject: any) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowEmoji(false);
  };

  // const content = useRef("");
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

      router.push(`/home/${userId}`);
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
                  onClick={() => setShowEmoji((val) => !val)}
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
              <div>
                {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
              </div>

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
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
            />
          </div>

          <FileInput />

          <input
            name="postTag"
            placeholder="#해시태그"
            type="hidden"
            value={inputValue}
            onChange={handleChange}
          />
          <TagifyComponent setTagValues={setTagValues} />
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
