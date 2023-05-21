"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "./userContextProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const userId = useContext<number | null>(UserContext);

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      // 로그인된 상태
      router.push(`/home/${userId}`);
    } else {
      router.push("/auth/login");
    }
  }, []);
  return <></>;
}
