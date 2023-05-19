"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "./userContextProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const userId = useContext<number | null>(UserContext);

  useEffect(() => {
    // const token = sessionStorage.getItem("access-token");
    if (userId) {
      // 로그인된 상태이므로 다음 경로로 리다이렉트 또는 필요한 작업을 수행합니다.
      router.push(`/home/${userId}`);
    }
  }, []);
  return <></>;
}
