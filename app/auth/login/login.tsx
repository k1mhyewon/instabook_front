"use client";

import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { Inputs } from "@/app/components/inputs";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/userContextProvider";
import googleLoginBtn from "../../../public/images/util/googleLoginBtn.png";

export const Login = () => {
  const router = useRouter();

  const userId = useContext<number | null>(UserContext);

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    if (userId !== null && token) {
      // 로그인된 상태이므로 다음 경로로 리다이렉트 또는 필요한 작업을 수행합니다.
      router.push(`/home/${userId}`);
    }
  }, []);

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

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        json,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      sessionStorage.setItem(
        "access-token",
        JSON.stringify(response.data.access_token)
      );

      router.push(`/home/${response.data.payload.sub}`);
      // setUserContext(userId);

      // const sessionData = sessionStorage.getItem("access-token");
      // let localUserId;
      // axios
      //   .get("http://localhost:3000/api/getUserInfo", {
      //     headers: {
      //       Authorization: `Bearer ${sessionData}`,
      //     },
      //   })
      //   .then((response) => {
      //     localUserId = response.data.sub;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      alert("로그인 성공");
    } catch (error) {
      alert("로그인 실패");
      console.error(error);
    }
  };
  return (
    <>
      <section className="mt-20">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                action={"/api/auth/login"}
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
                  type={"password"}
                  name={"password"}
                  placeholder={"••••••••"}
                  min={3}
                  max={15}
                />

                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div> */}

                <button
                  type="submit"
                  className="w-full text-white bg-orange-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <button>
                  <Image src={googleLoginBtn} alt="logo" className="w-50" />
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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

{
  /* <div>
                  <label
                    htmlFor="userId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    name="userId"
                    id="userId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="user name"
                  />
                </div> */
}

{
  /* <div>
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
                  />
                </div> */
}
