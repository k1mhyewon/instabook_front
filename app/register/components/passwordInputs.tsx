"use client";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  passwordSame: MutableRefObject<boolean>;
  passwordValid: MutableRefObject<boolean>;
}

export const PasswordInputs = (props: Props) => {
  const password = useRef("");
  const passwordCheck = useRef("");

  const localPasswordSame = useRef(false);
  const localPasswordValid = useRef(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;

    const { name, value } = event.target;
    switch (name) {
      case "password":
        password.current = value;

        if (passwordRegex.test(password.current)) {
          props.passwordValid.current = true;
          localPasswordValid.current = true;
        } else {
          props.passwordValid.current = false;
          localPasswordValid.current = false;
        }
        break;
      case "passwordCheck":
        passwordCheck.current = value;
        break;
      default:
        break;
    }

    if (passwordCheck.current === password.current) {
      props.passwordSame.current = true;
      localPasswordSame.current = true;
    } else {
      props.passwordSame.current = false;
      localPasswordSame.current = false;
    }

    console.log(localPasswordValid.current);
  };

  return (
    <>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleInputChange}
          required
          minLength={8}
          maxLength={15}
        />
        {localPasswordValid.current ? (
          <></>
        ) : (
          <>
            <p className="text-red-600 text-xs italic mt-2">
              8-15자리의 대,소문자, 숫자
            </p>
          </>
        )}
      </div>
      <div>
        <label
          htmlFor="passwordCheck"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          name="passwordCheck"
          id="passwordCheck"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleInputChange}
          required
          minLength={8}
          maxLength={15}
        />
        {localPasswordSame.current ? (
          <></>
        ) : (
          <>
            <p className="text-red-600 text-xs italic mt-2">
              비밀번호가 일치하지 않습니다.
            </p>
          </>
        )}
      </div>
    </>
  );
};
