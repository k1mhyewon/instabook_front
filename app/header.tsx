"use client";

import Image from "next/image";
import logoimg from "../public/images/logo.png";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/app/userContextProvider";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const usercontext = useContext<number | null>(UserContext);

  const userId = usercontext ?? "";

  const goLogout = () => {
    sessionStorage.removeItem("access-token");
    router.push(`auth/login`);
  };

  useEffect(() => {
    // 클라이언트 측에서 실행되는 경우에만 sessionStorage 접근
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("access-token");
      setToken(storedToken);
    }
  }, [usercontext]);

  return (
    <>
      <header className="border-b-0 border-gray-300 w-full h-18 flex justify-center items-center relative">
        {userId ? (
          <>
            <div className="absolute left-0 flex items-center ml-4">
              <Link href="/search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </Link>
              <Link href={`/post/write/${userId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-2 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="flex justify-center">
          {userId ? <></> : <></>}
          <Link href={userId ? `/home/${userId}` : "/auth/login"}>
            <Image src={logoimg} alt="logo" className="w-32" />
          </Link>
        </div>
        {userId ? (
          <>
            <div className="absolute right-10 flex items-center mr-4">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={goLogout}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute right-0 flex items-center mr-4">
              <Link href={`/profile/${userId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </header>
    </>
  );
};
