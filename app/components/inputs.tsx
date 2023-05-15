"use client";

import { useRef, useState } from "react";

type InputType = {
  type: string;
  name: string;
  min?: number;
  max?: number;
  pattern?: string;
  placeholder?: string;
};

export const Inputs = (props: InputType) => {
  const userName = useRef("");
  const userId = useRef("");
  const password = useRef("");

  const isUserNameValid = useRef(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "userName":
        userName.current = value;
        break;
      case "userId":
        userId.current = value;
        break;
      case "password":
        password.current = value;
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div>
        <label
          htmlFor="userName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.name}
        </label>
        <input
          type={props.type}
          name={props.name}
          id={props.name}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
          pattern={props.pattern}
          minLength={props.min}
          maxLength={props.max}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
};
