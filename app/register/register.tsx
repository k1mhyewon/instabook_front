"use client";

import Link from "next/link";
import axios from "axios";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Inputs } from "../components/inputs";
import { PasswordInputs } from "./components/passwordInputs";

export const Register = () => {
  const passwordSame = useRef(false);
  const passwordValid = useRef(false);

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
      console.log(key, value);
      json[key] = value;
    }
    if (passwordSame.current && passwordValid.current) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          json,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        alert("회원가입 성공");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("안맞음");
    }
  };

  return (
    <>
      <section className="mt-16">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action={"/api/register"}
                method="post"
                onSubmit={handleSubmit}
              >
                <Inputs
                  type={"text"}
                  name={"userName"}
                  placeholder={"User Name"}
                  min={4}
                  max={15}
                />

                <Inputs
                  type={"text"}
                  name={"name"}
                  placeholder={"name"}
                  min={2}
                  max={10}
                />

                <PasswordInputs
                  passwordSame={passwordSame}
                  passwordValid={passwordValid}
                />

                <button
                  type="submit"
                  className="w-full text-white bg-orange-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
