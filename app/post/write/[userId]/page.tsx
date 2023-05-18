"use client";

import { PostWriteForm } from "../postWriteForm";
import { useContext, useEffect, useState } from "react";
import { UserWithFollowType } from "@/app/types/userTypes";
import axios from "axios";
import { UserContext } from "@/app/userContextProvider";
import { HomeUserTitle } from "@/app/home/homeUserTitle";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function writePage({ params: { userId } }: Params) {
  // const usercontext = useContext<number | null>(UserContext);
  // const userId = usercontext ?? "";

  const [userInfo, setUserInfo] = useState<UserWithFollowType | undefined>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/profileOnly/${userId}`, {})
      .then((response) => {
        const resUserInfo = response.data;
        setUserInfo(resUserInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <HomeUserTitle
        userName={userInfo?.userName}
        userId={userInfo?.id}
        profilePhoto={userInfo?.profilePhoto}
      />

      <PostWriteForm />
    </>
  );
}
