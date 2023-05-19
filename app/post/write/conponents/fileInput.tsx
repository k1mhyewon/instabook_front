"use client";
import { useState } from "react";

export const FileInput = () => {
  // 파일업로드
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  // const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setSelectedFile(e.currentTarget.files?.[0]);
  // };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  return (
    <>
      {/* <div className="flex items-center justify-center w-full">
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="files"
            type="file"
            className="hidden"
            name="files"
            // onChange={({ target }) => {
            //   if (target.files) {
            //     const file = target.files[0];
            //     setSelectedImage(URL.createObjectURL(file));
            //     setSelectedFile(file);
            //   }
            // }}
            onChange={onFileChange}
          />
        </label>
        {selectedImage ? (
          <img src={selectedImage} alt="" className="w-20 h-30" />
        ) : (
          <div></div>
        )}
      </div> */}

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="multiple_files"
      >
        Photo
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="files"
        name="files"
        type="file"
        onChange={onFileChange}
        multiple
      />
    </>
  );
};
